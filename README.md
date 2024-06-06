# luma-shop-autotesting
This a project for launch automated tests for product page https://magento-2.showcase-wallee.com/olivia-1-4-zip-light-jacket.html#size=166&color=49

## How to launch autotests
Clone, install and run the project using commands:

```
git clone https://github.com/Eriusik/luma-shop-autotesting.git
npm install
npm run cypress:run
```

## Which tests are covered
1. Check product options on the product page
- Select different sizes and different colors: product should be added to the cart in all cases

Negative cases: 
- Product option is not selected: An error is displayed: This is a required field.

2. Add to the cart different quantity of the product
- Type min quantity,  max quantity and middle (Ex. 1, 10, 100) - products should be added to the cart

Negative cases:
- quantity is 0  - An error is displayed: 'Please enter a quantity greater than 0.'
- quantity is string  - An error is displayed: 'Please enter a valid number in this field.'
- quantity is decimal  - An error is displayed: 'You cannot use decimal quantity for this product.'

3. Add product to the cart several times
- Add product to the cart several times - products should be added to the cart, quantity is increased

## Test Report:
```
  Add different size and different count of product to the cart from the product page
    ✓ Test 3 - add to the cart several times (8592ms)
    Test 1 - Check product options on the product page
      ✓ select size XS and add to the cart (5071ms)
      ✓ select size S and add to the cart (2091ms)
      ✓ select size M and add to the cart (4763ms)
      ✓ select size L and add to the cart (4457ms)
      ✓ select size XL and add to the cart (4220ms)
      ✓ Test 1 - select color Black and add to the cart (4736ms)
      ✓ Test 1 - select color Blue and add to the cart (4048ms)
      ✓ Test 1 - select color Purple and add to the cart (4338ms)
      ✓ Negative case - size is not selected (3675ms)
      ✓ Negative case - color is not selected (3636ms)
    Test 2 - Add to the cart different quantity of the product
      ✓ Test 2 - add to the cart 1 items (4573ms)
      ✓ Test 2 - add to the cart 10 items (4710ms)
      ✓ Test 2 - add to the cart 100 items (4788ms)
      ✓ Negative case - type decimal quantity (8367ms)
      ✓ Negative case - 0 quantity (4212ms)
      ✓ Negative case - type string instead quantity (5125ms)
      ✓ Negative case - type negative digit instead quantity (4922ms)
      ✓ Negative case - type negative digit instead quantity (8817ms)


  19 passing (2m)
```