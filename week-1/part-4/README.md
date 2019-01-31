# Week 1 Part 4

## Assignment

### Step 1: Complete Category and Search Feature

Focus on our `List Product API` which supports `tag` parameter.

1. Set tag to `women`, `men`, or `accessories` for the product lists of each categories, and show them in the homepage.
2. Set tag to the keyword entered by user, and show the search results in the homepage.

---

### Step 2: Complete Paging Feature

At the same time, we notice there is a `page` parameter supported by `List Product API`.  
Set page to `0 for first page`, `1 for second page`, and so on ...  

#### Infinite Scroll

Listen to scroll action of browser!  
If user almost scroll down to the bottom, we should load and show next page automatically.

Hints:
1. Check `scroll` event in the `window` object.
2. Check `getBoundingClientRect()` method.
