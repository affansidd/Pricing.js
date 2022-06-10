# js-library-siddi858
References:
https://www.w3schools.com/howto/howto_js_popup.asp,
https://css-tricks.com/snippets/css/css-triangle/,
https://www.w3schools.com/html/html_tables.asp,
https://www.w3schools.com/css/css_table.asp,
https://www.w3schools.com/css/css3_buttons.asp,
https://www.instagram.com/p/CWwpVYaoLyv/?utm_source=ig_web_copy_link,
https://www.w3schools.com/css/css3_gradients.asp,

Landing Page: https://floating-earth-12142.herokuapp.com/,
Documentation: https://floating-earth-12142.herokuapp.com/documentation.html



Getting Started:
To get started with the Pricing.js library, first download the libary code from here. Ensure the icons folder is in the same directory as the js folder.
Next, include the following tags in your html file to include library functionality in your web app:

```
<script type="text/javascript" src=".../pub/js/pricing.js"></script>
<link rel="stylesheet" type="text/css" href=".../pub/pricing.css">
```

Once the pricing.js and pricing.css files have been linked, you're ready to start using the Pricing.js library to create unique and intuitive pricing matrices to display your products and/or services!

The following code snippet demonstrates how to create a pyramid pricing matrix to represent a tiered service structure. First create a JS object that represents the product information, according to the specifications of the type of matrix you wish to creatte. Then use the constructor for the type of matrix you want to build to create an instance of a generator. Finally, use the generators make method to create the object and add it to a container of your choice.

                    

            
    //create an object that represents the product information (more details about the requirements for each type of matrix can be found below)

    const subscriptionPyramid = [
        {
            value: "Prestige",
            text: "Price: $30. Our most prestige package offers unlimited usage and our top speeds that will never slow down",
            color: '#d766ed'
        }, 
        {
            value: "Intermediate: $25",
            text: "The intermediate package offers 500GB monthly usage of high speed internet. (Speed may slow down during peak times)",
            color: '#eda166'
        }, 
        {
            value: "Basic: $15",
            text: "The basic package offers 100GB monthly usage of moderate speed internet. This package is suitable for those with minimal internet needs.",
            color: '#DAF7A6'
        }
    ]

    const container = document.querySelector('body')

    const pyramidGenerator = new PyramidGenerator()
    const pyramidNum = pyramidGenerator.createPyramid(subscriptionPyramid, container)
                    

                
The same process applies for each of the different types of matrices the library can create. Simply create an object according to the specifications of the type of matrix you want to create (specifications which can be found below), create (if you haven't already) an object using the constructor of the desired matrix and use the constructor to generate the pricing matrix.
