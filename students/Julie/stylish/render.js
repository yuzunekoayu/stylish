/* Render 小精靈
    renderKV() === render Key Visual
    renderPD() === render Product
    renderDetails() === render Product Details
*/

// render Key Visual
function renderKV(layout) {
    const carousel = document.getElementById("carousel");
    
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < layout.data.length; i++) {
        const slide = document.createElement("div");
        const visual = 'http://' + `${host}` + `${layout.data[i].picture}`;
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
        title.innerText = `${layout.data[i].title}`;

        const price = document.createElement("div");
        price.className = "price";
        price.innerText = "TWD." + `${layout.data[i].price}`;

        product.appendChild(mainImg);
        product.appendChild(palette);
        product.appendChild(title);
        product.appendChild(price);
        fragment.appendChild(product);
    }
    
    row.appendChild(fragment);
}

// render Product Details
function renderDetails(layout) {
    const left = document.querySelector('#left');
    const leftImg = document.createElement('img');
    leftImg.src = layout.data.main_image;
    left.appendChild(leftImg);

    const prodTitle = document.querySelector('#prodTitle');
    prodTitle.innerText = layout.data.title;

    const prodId = document.querySelector('#prodId');
    prodId.innerText = layout.data.id;

    const prodPrice = document.querySelector('#prodPrice');
    prodPrice.innerText = 'TWD.' + layout.data.price;

    const prodColors = document.querySelector('#prodColors');

    for (let i = 0; i < layout.data.colors.length; i++) {
        const sikaku =  document.createElement('div');
        sikaku.className = "sikaku";

        const iro = document.createElement('div');
        iro.className = "iro";
        iro.style.cssText = 'background:' + `#${layout.data.colors[i].code}`;
        
        sikaku.appendChild(iro);
        prodColors.appendChild(sikaku);
    }

    const prodSizes = document.querySelector('#prodSizes');
    for (let i = 0; i < layout.data.sizes.length; i++) {
        const sml = document.createElement('div');
        sml.className = "sml";
        sml.innerText = `${layout.data.sizes[i]}`;
        
        prodSizes.appendChild(sml);
    }

    const prodNote = document.querySelector('#prodNote');
    prodNote.innerText = layout.data.note;

    const prodTexture = document.querySelector('#prodTexture');
    prodTexture.innerText = layout.data.texture;

    const prodDesc = document.querySelector('#prodDesc');
    prodDesc.innerText = layout.data.description;

    const madeIn = layout.data.place;
    const prodPlace = document.querySelector('#prodPlace');
    prodPlace.innerHTML = '素材產地 / ' + madeIn + '<br>加工產地 / ' + madeIn;

    const details = document.querySelector('#details');

    const fragment = document.createDocumentFragment();

    const lines = layout.data.story;

    const storyA = document.createElement('div');
    storyA.className = "prodStory";
    storyA.innerText = lines;
    const imgsA = document.createElement('img');
    imgsA.src = layout.data.images[0];

    const storyB = document.createElement('div');
    storyB.className = "prodStory";
    storyB.innerText = lines;
    const imgsB = document.createElement('img');
    imgsB.src = layout.data.images[1];

    fragment.appendChild(storyA); fragment.appendChild(imgsA);
    fragment.appendChild(storyB); fragment.appendChild(imgsB);

    details.appendChild(fragment);
} 