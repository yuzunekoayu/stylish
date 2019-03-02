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
    if (orderForm.get('consumer') !== "" && orderForm.get('phone') !== "" && 
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

    if (checkCartList() === true && checkOrderInfo() === true) {
        console.log("您是個認真填表的好顧客～!");
        onSubmit();
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
    } else {
        // Disable submit Button to get prime.
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError();        
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

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
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
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
    })
}
