/* Render 小精靈
    renderKV() === render Key Visual
    renderPD() === render Product
    renderDetails() === render Product Details（單一產品頁）
    renderCartList === render Cart List（購物車清單）
*/

// render Key Visual
function renderKV(layout) {
    const carousel = document.getElementById("carousel");
    
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < layout.data.length; i++) {
        const slide = document.createElement("div");
        const visual = 'https://' + `${host}` + `${layout.data[i].picture}`;
        slide.className = "slide";
        slide.style.backgroundImage = ('src', "url('" + visual + "')");

        // 根據 <br> 把故事文拆開變一行一行
        const line = `${layout.data[i].story}`.split('\r\n');

        // 創造裝故事的 div.story
        const story = document.createElement("div");
        story.className = "story"

        // 再用 <br> 把一行一行的故事文串起來，然後在最後一行加 span.subText 才能還原成設計稿畫的樣子。
        story.innerHTML = `${line[0] + '<br>' + line[1] + '<br>' + line[2] + '<br><span class="subText">' + line[3] + '</span>'}`;
        
        slide.appendChild(story);
        fragment.appendChild(slide);
    }

    const dotWrap = document.createElement("div");
    dotWrap.className = "dotWrap";
    fragment.appendChild(dotWrap);

    // 讓位在第一個的點點同時有 dot activeDot 的 class
    for(let d = 0; d < layout.data.length - (layout.data.length - 1); d++) {
        const dot = document.createElement("div");
        dot.className = "activeDot dot";
        dotWrap.appendChild(dot);
    }
    
    for(let d = 0; d < layout.data.length - 1; d++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dotWrap.appendChild(dot);
    }
    
    carousel.appendChild(fragment);
}

// render Product
function renderPD(layout) {

    const row = document.getElementById("row");

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < layout.data.length; i++) {

        const product = document.createElement("div");
        product.className = "product";

        const prodLink = document.createElement("a");
        prodLink.href = `./product.html?id=${layout.data[i].id}`;
        product.appendChild(prodLink);

        const palette = document.createElement("div");
        palette.className = "palette";

        for(let c = 0; c < layout.data[i].colors.length; c++) {
            const colors = document.createElement("div");
            colors.className = "colors";
            let code = layout.data[i].colors[c].code;
            colors.style.cssText = 'background:' + `#${code};`;
            palette.appendChild(colors);
        }

        const mainImg = document.createElement("img");
        mainImg.src = `${layout.data[i].main_image}`;

        const title = document.createElement("div");
        title.className = "title";
        title.textContent = `${layout.data[i].title}`;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = "TWD." + `${layout.data[i].price}`;

        product.appendChild(mainImg);
        product.appendChild(palette);
        product.appendChild(title);
        product.appendChild(price);
        fragment.appendChild(product);
    }
    
    row.appendChild(fragment);
}

// render Product Details（單一產品頁）
function renderDetails(layout) {
    
    const left = document.querySelector('#left');
    const leftImg = document.createElement('img');
    leftImg.src = layout.data.main_image;
    left.appendChild(leftImg);

    const prodTitle = document.querySelector('#prodTitle');
    prodTitle.textContent = layout.data.title;

    const prodId = document.querySelector('#prodId');
    prodId.textContent = layout.data.id;

    const prodPrice = document.querySelector('#prodPrice');
    prodPrice.textContent = 'TWD.' + layout.data.price;

    const prodColors = document.querySelector('#prodColors');

    for (let i = 0; i < layout.data.colors.length; i++) {
        const square =  document.createElement('div');
        square.className = "square";
        square.title = `${layout.data.colors[i].name}`;
        square.dataset.color_code = `${layout.data.colors[i].code}`;

        const iro = document.createElement('div');
        iro.className = "iro";
        iro.style.cssText = 'background:' + `#${layout.data.colors[i].code}`;

        square.appendChild(iro);
        prodColors.appendChild(square);
    }

    const prodSizes = document.querySelector('#prodSizes');
    for (let i = 0; i < layout.data.sizes.length; i++) {
        const sml = document.createElement('div');
        sml.className = "sml";
        sml.textContent = `${layout.data.sizes[i]}`;
        
        prodSizes.appendChild(sml);
    }

    const prodNote = document.querySelector('#prodNote');
    prodNote.textContent = layout.data.note;

    const prodTexture = document.querySelector('#prodTexture');
    prodTexture.textContent = layout.data.texture;

    const prodDesc = document.querySelector('#prodDesc');
    prodDesc.textContent = layout.data.description;

    const madeIn = layout.data.place;
    const prodPlace = document.querySelector('#prodPlace');
    prodPlace.innerHTML = '素材產地 / ' + madeIn + '<br>加工產地 / ' + madeIn;

    const details = document.querySelector('#details');

    const fragment = document.createDocumentFragment();

    const lines = layout.data.story;

    const storyA = document.createElement('div');
    storyA.className = "prodStory";
    storyA.textContent = lines;
    const imgsA = document.createElement('img');
    imgsA.src = layout.data.images[0];

    const storyB = document.createElement('div');
    storyB.className = "prodStory";
    storyB.textContent = lines;
    const imgsB = document.createElement('img');
    imgsB.src = layout.data.images[1];

    fragment.appendChild(storyA); fragment.appendChild(imgsA);
    fragment.appendChild(storyB); fragment.appendChild(imgsB);

    details.appendChild(fragment);
} 

// render Shopping Cart List（購物車清單）
function renderCartList(layout) {

    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < layout.length; i++) {
        const cartItem = document.createElement('div');
        cartItem.classList = "cartItem";
        cartItem.dataset.confirm = layout[i].confirm;
        
        const cartLeft = document.createElement('div');
        cartLeft.classList = "cartLeft";

        const cartRight = document.createElement('div');
        cartRight.classList = "cartRight";

        cartItem.appendChild(cartLeft);
        cartItem.appendChild(cartRight);
    
        const cartImgWrap = document.createElement('div');
        cartImgWrap.classList = "cartImg";
        
        const cartImg = document.createElement('img');
        cartImg.src = layout[i].mainImg;

        cartImgWrap.appendChild(cartImg);
        cartLeft.appendChild(cartImgWrap);

        const cartBasic = document.createElement('div');
        cartBasic.classList = "cartBasic";
        cartBasic.innerHTML = layout[i].name + '<br><br>' + 
                                layout[i].id + '<br><br>顏色｜' + 
                                layout[i].color.name + '<br>尺寸｜' + 
                                layout[i].size + '<br>';
    
        cartLeft.appendChild(cartBasic);
        
        const cartQty = document.createElement('div');
        cartQty.classList = "cartQty";

        const cartM1 = document.createElement('div');
        cartM1.classList = "cartMoji";
        cartM1.textContent = "數量";

        const qtySelect = document.createElement('select');
        qtySelect.dataset.confirm = layout[i].confirm;
        record(layout[i].id, layout[i].color.code, layout[i].size, layout[i].qty, qtySelect);

        cartQty.appendChild(cartM1);
        cartQty.appendChild(qtySelect);

        const cartPiece = document.createElement('div');

        const cartM2 = document.createElement('div');
        cartM2.classList = "cartMoji";
        cartM2.textContent = "單價";

        const cartPrice = document.createElement('p');
        cartPrice.id = "cartPiecePrice";
        cartPrice.textContent = "NT." + layout[i].price;

        cartPiece.appendChild(cartM2);
        cartPiece.appendChild(cartPrice);

        const cartSub = document.createElement('div');
        
        const cartM3 = document.createElement('div');
        cartM3.classList = "cartMoji";
        cartM3.textContent = "小計";
        
        const cartTotal = document.createElement('p');
        cartTotal.id = "cartSubTotal";
        cartTotal.dataset.confirm = layout[i].confirm;
        cartTotal.textContent = "NT." + layout[i].price * layout[i].qty;

        cartSub.appendChild(cartM3);
        cartSub.appendChild(cartTotal);

        cartRight.appendChild(cartQty);
        cartRight.appendChild(cartPiece);
        cartRight.appendChild(cartSub);

        const cartDelete = document.createElement('div');
        cartDelete.classList = "cartDelete";
        cartDelete.dataset.confirm = layout[i].confirm;
        cartRight.appendChild(cartDelete);
        
        fragment.appendChild(cartItem);
    }

    cartList.appendChild(fragment);

}