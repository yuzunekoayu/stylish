# Week 1 Part 3

## Assignment

### Step 1: Connect to RESTful API for Data

We have just completed home page layout. Now, let's get product list from server dynamically.

Connect to [Product List API](https://github.com/AppWorks-School/API-Doc/blob/master/Stylish/README.md#product-list-api) by AJAX for data of all products, right after HTML DOM ready.  

---

### Step 2: Create Product List Layout Dynamically

Data is ready! But there is something different from good old day.

Now, we should create product list by JavaScript dynamically.  
At first, it's empty in our container of product list, we should create HTML elements based on data from server.

#### Handling Images

Every product has `1 main image (3:4)` and `2 supplement images (16:9)` which are served by Firebase Storage service.  
You should follow steps below to show product image in the page:

#### 1. Import Firebase Libraries:

```html
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-storage.js"></script>
```

#### 2. Initialized Firebase App:

```javascript
firebase.initializeApp({
  apiKey: [API Key], // AIzaSyB8bXw1Xco2dzjTwI1RvjJsMalLXtr8gYo
  projectId: [Project ID], // appworks-school-stylish
  storageBucket: [Storage Bucket Name] // appworks-school-stylish.appspot.com
});
```

#### 3. Get Storage Bucket Object:

```javascript
let storage=firebase.storage();
```

#### 4. Get Image URL Dynamically:

```javascript
storage.ref(影像參考路徑).getDownloadURL().then((url)=>{
  // url can be used as source of image element
});
```

#### 5. About 影像參考路徑:

* Main Image Path: `[Product ID]/main.jpg`
* Supplement Image Paths: `[Product ID]/0.jpg` and `[Product ID]/1.jpg`
