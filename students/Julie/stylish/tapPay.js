// 檢查購物車是否空空
function checkCartList() {
    if (list.length > 0) {
        return true;
    } else {
        return false;
    }
}

// 檢查訂購資料（還沒用正規表現）
function checkOrderInfo() {
    // 選到訂到購料表格，做成 FormData 物件
    const orderForm = new FormData(orderInfo);
    // 檢查是否都填好，買家名字、電話、手機、email、配送時間，缺一不可。
    if (orderForm.get('consumer') !== "" && orderForm.get('phone') !=="" && 
        orderForm.get('address') !== "" && orderForm.get('email') !== "" && 
        orderForm.get('deliverTime') !== null) {
        return true;
    } else {
        return false;
    }
}

// 確認付款按鈕綁定事件
cartYesPay.addEventListener("click", finalCheck);

function finalCheck(e) {
    e.preventDefault();

    console.log(sumTotalNum, shippingFeeNum, payableNum);
    console.log(checkCartList(), checkOrderInfo());
    console.log(selectDeliveryArea.value, selectPayWay.value);

    if (checkCartList() === true && checkOrderInfo() === true && creditReady === true) {
        console.log("您是個認真填表的好顧客～!");
        onSubmit();
        // 跳轉 Thank You Page 前的 Loading 畫面。
        cartYesPay.innerHTML = '<div id="processingOrder"></div>處理中';
    } else {
        console.log("您是不認真填表的顧客:(");
        return
    }
}

// Tap Pay SDK 初始化　TPDirect.setupSDK(appID, appKey, serverType)
TPDirect.setupSDK(12348, "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF", "sandbox");

// 外觀設定 TPDirect.card.setup(config)
TPDirect.card.setup({
    fields: {
        number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: '卡片背面後三碼'
        }
    },
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            'font-size': '20px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
});

// 檢查輸入的對不對 TPDirect.card.onUpdate(callback)
TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        creditReady = true;
    } else {
        // Disable submit Button to get prime.
        creditReady = false;
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    //if (update.cardType === 'visa') {
        // Handle card type visa.
    //}

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError();        
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

    // 到期日欄位錯誤
    if (update.status.expiry === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

    // 安全碼欄位錯誤
    if (update.status.cvc === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }
});

// 取得 Prime 授權。TPDirect.card.getPrime(callback)
// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)
function onSubmit() {
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    // 信用卡資料在確認付款按鈕那邊自己手動檢查一次（creditReady變數），
    // 這邊 Tap Pay 內建再幫忙檢查一次。
    if (tappayStatus.canGetPrime === false) {
        console.log('您是個不好好填信用卡資料的顧客，can not get prime');
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            console.log('get prime error ' + result.msg);
            return
        }
        console.log('您是個認真填信用卡資料的好顧客！，get prime 成功，prime: ' + result.card.prime);
        
        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
        
        // 把 Prime 當成參數，傳給 orderMaker()，整合成彭彭的 Check Out API 要的物件。 
        const order = orderMaker(result.card.prime);
        // 把物件 POST 給 Check Out API，然後取回訂單編號。
        checkOut(order);
    })
}

// POST 訂單給 Check Out API，用 Fetch，取得訂單號碼，跳轉到 Thank You Page
function checkOut (order) {
<<<<<<< HEAD
    const url = `https://${host}/api/1.0/order/checkout`
=======
    const url = `http://${host}/api/1.0/order/checkout`
>>>>>>> 2098755e83589edb5494695db83f9b0198e41ab2
    fetch(url, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        // 用 Fetch POST的話，必須把轉成字串才行。 
        body: JSON.stringify(order)
    })
    .then( res => {
        return res.json();
    })
    .then( json => {
        // 清空購物車，因為結帳了。
        localStorage.removeItem("list");
        // 取得 API 回傳的訂單號碼 + 跳轉到 Thank You Page（將訂單號碼放在網址參數裡）
        window.location.href = `thankYou.html?orderNum=${json.data.number}`
    })
    .catch(err => {
        console.log(err);
    })
}

// 訂單製造者
function orderMaker(primeKey) {
    const orderForm = new FormData(orderInfo);
    const remadeList = remakeList();
    return {
        prime: primeKey,
        order: {
            shipping: selectDeliveryArea.value,
            payment: selectPayWay.value,
            subtotal: sumTotalNum,
            freight: shippingFeeNum,
            total: payableNum,
            recipient: {
                name: orderForm.get('consumer'),
                phone: orderForm.get('phone'),
                email: orderForm.get('email'),
                address: orderForm.get('address'),
                time: orderForm.get('deliverTime')
            },
            list: remadeList
        }
    }
}

// 清除 local storage 裡 Check Out API 不要的 Key 跟值（用 map 重組陣列）
function remakeList() {
    const remade = list.map( li => {
        return {
            id: li.id,
            name: li.name,
            price:li.price,
            color: {
                name: li.color.name,
                code: li.color.code
            },
            size: li.size,
            qty: li.qty
        }
    })
    return remade
}