// 伺服器名
let host = '18.214.165.31'; 
// 把現在的網址位置存起來
let prodURL = new URL(window.location);

// Connect Product Details API
fetch(`http://${host}/api/1.0/products/details${prodURL.search}`)
  .then( res => {
    return res.json();
  })
  .then( json => {
    console.log(json.data);
    console.log('json id: ' + json.data.id);
    // renderKwsk(json);
  })
  .catch( err => {
    console.log(err);
  })

  function renderKwsk(layout) {

    // const fragment = document.createDocumentFragment();

    // 刪除 left 包的東西
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

    const prodColors = document.querySelector('#prodPrice');
    
  
    const prodSizes = document.querySelector('#prodSizes');
    

    const prodNote = document.querySelector('#prodNote');
    prodNote.innerText = layout.data.note;

    const prodTexture = document.querySelector('#prodTexture');
    prodTexture.innerText = layout.data.texture;

    const prodDesc = document.querySelector('#prodDesc');
    prodDesc.innerText = layout.data.description;
    
    const madeIn = layout.data.place;
    const prodPlace = document.querySelector('#prodPlace');
    prodPlace.innerText = '素材產地 / ' + madeIn + '<br>加工產地 / ' + madeIn;

    const details = document.querySelector('#details');
    const lines = layout.data.story;
    
    const storyA = document.createElement('div');
    storyA.className = prodStory;
    storyA.innerText = lines;
    const imgsA = document.createElement('img');
    imgsA.src = layout.data.images[0];

    const storyB = document.createElement('div');
    storyB.className = prodStory;
    storyB.innerText = lines;
    const imgsB = document.createElement('img');
    imgsB.src = layout.data.images[1];

    details.appendChild(storyA); details.appendChild(imgsA);
    details.appendChild(storyB); details.appendChild(imgsB);

    // prod.appendChild(fragment);

  } 