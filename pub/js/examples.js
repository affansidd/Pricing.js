"use strict";

const foodTree = 
    {value: 'All-Inclusive: $20',
     text: "Our all-inclusive package includes all of the types of items including Meat/Gravy, BBQ, Veggie, and Dessert! Ideal for 50+ guests.",
     children: [
        {
            value: 'Completely Meat: $15',
            text: "The Completely Meat package combines the Meat and gravy with BBQ to offer the best of both worlds!",
            color: "#C85C5C",
            children: [
                {
                    value: 'Meat/Gravy: $10',
                    text: "This package offers a variety of our meat products with gravy",
                    color: "#FFB344",
                    children: []
                },
                {
                    value: 'BBQ: $10',
                    text: "This package offers a variety of our BBQ products",
                    color: "#e5b502",
                    children: []
                }
            ]
        },
        {
            value: 'Veggie + Dessert: $12',
            text: "The Veggie + Dessert package combines the Veggie package with our delicious deserts for a healthy and sweet combination",
            color: "#FAF2DA",
            children: [
                {
                    value: 'Veggie: $7',
                    text: "This package offers our Veggie dishes made from freshly picked veggies!",
                    color: "#9FE6A0",
                    children: []
                },
                {
                    value: 'Dessert: $5',
                    text: "This package is perfect for special occasions and offers our most savoury and sweet dishes!",
                    color: "#1CC5DC",
                    children: []
                }
            ]
        }
     ]
    }

const subscriptionPyramid = [
    {
        value: "Prestige",
        text: "Price: $30. Our most prestige package offers unlimited usage and our top speeds that will never slow down",
        color: '#d766ed'
    }, {
        value: "Intermediate: $25",
        text: "The intermediate package offers 500GB monthly usage of high speed internet. (Speed may slow down during peak times)",
        color: '#eda166'
    }, {
        value: "Basic: $15",
        text: "The basic package offers 100GB monthly usage of moderate speed internet. This package is suitable for those with minimal internet needs.",
        color: '#DAF7A6'
    }
]

const vennInfo = [
    {
        header: 'Apple Airpods: $189.99',
        details: `AirPods will forever change the way you use headphones. Whenever you pull your AirPods out of the charging case, they instantly turn on and connect to your iPhone, 
        Apple Watch, iPad, or Mac. Audio automatically plays as soon as you put them in your ears and pauses when you take them out. To adjust the volume, change the song, make a call,
         or even get directions, just double-tap to activate Siri.`
    },
    {
        header: 'Similarities:',
        details:  ['H1 Chip', 'Hey Siri', '5 Hour Battery Life', 'Automatic Switching Between Apple Devices', 'Personalized Engraving', 'Charging Case'],
    },
    {
        header: 'Apple Airpods Pro: $329.99',
        details: `The AirPods Pro look similar to the original AirPods, but have a design with a wider front to accommodate silicone tips for comfort, fit, and noise cancellation purposes. 
        Tips come in three sizes to fit different ears. Active Noise Cancellation is a key feature of the AirPods Pro, using two microphones (one outward facing and one inward facing) along 
        with advanced software to adapt to each ear for what Apple says is a "uniquely customized, superior noise-canceling experience." With a built-in Transparency mode that can be toggled on,
        users have the option to listen to music with Active Noise Cancellation turned on while still hearing the ambient environment around them. Inside of the AirPods Pro, there's a new vent 
        system aimed at equalizing pressure, which Apple says minimizes the discomfort common with other in-ear designs for a better fit and a more comfortable wearing experience.`
    }
]

const product = {
    name: '6ixMusic: Basic',
    img: 'https://cdn-icons-png.flaticon.com/512/1/1162.png',
    'price': '$5',
    frequency: 'Month',
    'Over 50 Million Songs': true,
    'Ad-Free': true,
    'Download Music': true,
    'Unlimited Skips': false,
    'Highest-Quality': false
}

const tableLst = [
    {
        Name: 'AirPods Max',
        Brand: 'Apple',
        Price: '$800',
        Bluetooth: true,
        Type: 'Over The Ear',
        'Noise Canceling': true,
        'USB-C': false,
        'Lightning': true,
        text: `Introducing AirPods Max — a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.`

    },
    {
        Name: 'SoundLink II',
        Brand: 'Bose',
        Price: '$400',
        Bluetooth: true,
        Type: 'Around Ear',
        'Noise Canceling': true,
        'USB-C': true,
        'Lightning': false,
        text: 'Wireless freedom meets best-in-class sound'
    },
    {
        Name: 'WH-1000XM4',
        Brand: 'Sony',
        Price: '$350',
        Bluetooth: true,
        Type: 'Over The Ear',
        'Noise Canceling': true,
        'USB-C': true,
        'Lightning': false,
        text: 'Sony’s intelligent industry-leading noise canceling headphones with premium sound elevate your listening experience with the ability to personalize and control everything you hear.'
    }
]

const page = document.querySelector(".page_container")

const bgen = new TreeGenerator()

const foodContainer = document.createElement("div")
foodContainer.id = "tree_ctn"

const foodHeader = document.createElement("h1");
foodHeader.appendChild(document.createTextNode("Tree Generator:"))
foodContainer.appendChild(foodHeader)


const foodTreeNum = bgen.makeTree(foodTree, foodContainer) //makeTree returns the tree number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the tree.


const foodText = document.createElement("p")
foodText.appendChild(document.createTextNode(`The above tree is an example of how to use a unique, creative and intuitive pricing matrix to display product information that reflects a hierarchial
structure. This unique design can be used to attract clients and help them clearly understand the various options they can choose from. In this example, the most basic options are the leaves of the tree 
whereas the interior nodes represent a combination of it's children and the root node represents the most premium option which combines all of the offerings available. A user can hover over 
any of the nodes to learn more information about the product or service the node represents. The developer has the ability to add and delete nodes, change the text and popup text of any of the nodes along with 
changing the color of any node.`))
foodContainer.appendChild(foodText)

page.appendChild(foodContainer)

const pg = new PyramidGenerator()

const subscriptionContainer = document.createElement("div")
subscriptionContainer.classList.add("example_ctn")

const subscriptionHeader = document.createElement("h1");
subscriptionHeader.appendChild(document.createTextNode("Pyramid Generator:"))
subscriptionContainer.appendChild(subscriptionHeader)


const subscriptionPyramidNum = pg.makePyramid(subscriptionPyramid, subscriptionContainer) //createPyramid returns the pyramid number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.

const pyramidText = document.createElement("p")
pyramidText.appendChild(document.createTextNode(`The above pyramid style pricing matrix is an example of how a company offering a subscription based service can use a creative design
to market their services. The pyramid is a timeless example of a heirarchial structure that users  immediately recognize and understand. This design is incredibly intuitive
as it clearly illustrates the different levels of service that is available to a client. The most premium service is at the top of the pyramid and provides the
intuition that the topmost section of the pyramid contains all the features of the sections that are below it. A user can hover over any section for more information. The developer
has the ability to choose between a 3 and 4 section pyramid, can add/remove a base to convert from 3 to 4 sections, change the text and popup text of any section and change the color of any 
section.`))
subscriptionContainer.appendChild(pyramidText)

page.appendChild(subscriptionContainer)


const vennGenerator = new VennDiagramGenerator()

const vennContainer = document.createElement("div")
vennContainer.classList.add("example_ctn")

const vennHeader = document.createElement("h1");
vennHeader.appendChild(document.createTextNode("VennDiagram Generator:"))
vennContainer.appendChild(vennHeader)


const vennNum = vennGenerator.makeVenn(vennInfo, vennContainer) //makeVenn returns the venn number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.

vennGenerator.addImage(vennNum, 0, 'https://www.pngarts.com/files/8/Airpod-Download-PNG-Image.png')
vennGenerator.addImage(vennNum, 2, 'https://cdn.revendo.eu/media/b1/46/e0/1632868522/apple-airpods-weiss-guenstig-gebraucht-kaufen-3.jpg.png')

const vennText = document.createElement("p")
vennText.appendChild(document.createTextNode(`The above Venn Diagram pricing matrix is classic and intutive design for comparing and contrasting different products and services to illustrate
the similarities and differences between the products that are available. The three sectional design offers developers to provide details about each product on the left and right sides of the
venn diagram and list the similarities between them in the middle. The VennDiagram pricing matrix offers the developer the ability, for each section, to change the header, change the product/service
details, add, remove, or change an image, change the size of the image and select the color. The developer can also set the size of the matrix to their desired dimensions. When listing the
details of the product or service, the developer can choose between displaying a paragraph of text or bulleted list of details, as illustrated above. Each section has overflow capabilities,
so if the text is too long for the size of the container, a user can scroll on the section to view the full text.`))
vennContainer.appendChild(vennText)

page.appendChild(vennContainer)


const cardGenerator = new PriceCardGenerator()

const cardContainer = document.createElement("div")
cardContainer.classList.add("example_ctn")

const cardHeader = document.createElement("h1");
cardHeader.appendChild(document.createTextNode("Price Card Generator:"))
cardContainer.appendChild(cardHeader)


const cardNum = cardGenerator.makeCard(product, cardContainer) //makeVenn returns the venn number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.


const cardText = document.createElement("p")
cardText.appendChild(document.createTextNode(`The above Price Card is a minimalist and straight-forward matrix for displaying information about a single product or service to a user. The price
card can be used on its own to showcase individual products. A developer can also choose to create several price cards and display them all alongside each other to display a set of products. 
The modularity of this design provides developers with several options and gives the devloper the freedom to choose how best to use the price cards to display the products or services. The PriceCard
matrix offers several API functionality including changing the name, price, and color of the card. There is also functionality to add, change and remove an image from the card, along with adding and changing
fields of the card and the values associated with each field. See the API documentation for more information.`))
cardContainer.appendChild(cardText)

page.appendChild(cardContainer)




const rowGen = new TableRowGenerator()

const rowContainer = document.createElement("div")
rowContainer.classList.add("example_ctn")

const rowHeader = document.createElement("h1");
rowHeader.appendChild(document.createTextNode("Table Row Generator:"))
rowContainer.appendChild(rowHeader)


const rowNum = rowGen.makeTable(tableLst, rowContainer) //makeVenn returns the venn number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.
rowGen.addImage(rowNum, 1, 'https://www.apple.com/v/airpods-max/d/images/overview/hero__gnfk5g59t0qe_xlarge.png')
rowGen.addImage(rowNum, 2, 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2017/12/boseqc35.png')
rowGen.addImage(rowNum, 3, 'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=440')

const rowText = document.createElement("p")
rowText.appendChild(document.createTextNode(`A table pricing matrix is always a go-to design for displaying product information. It's a classic option that gives you everything you need to give users
all the information about the products available while also giving a clearer picture of the pros and cons of each product. With the Table Row Generator, a developer is easily able to populate a table
structure with the product information they wish to display to users. The Table Row Generator represents each product as a row in the table. This matrix allows the developer to fully customize the table
to their liking. A developer can append a product to the end of the table, insert a product at a specific row, remove a product, add or change a heading from the table, change the value of a cell, change the
colour of a cell, add, remove and change the pop-up text of each product, add, change and remove an image for each product, and change the width of the table.`))
rowContainer.appendChild(rowText)

page.appendChild(rowContainer)

const colGen = new TableColumnGenerator()

const colContainer = document.createElement("div")
colContainer.classList.add("example_ctn")

const colHeader = document.createElement("h1");
colHeader.appendChild(document.createTextNode("Table Column Generator:"))
colContainer.appendChild(colHeader)


const colNum = colGen.makeTable(tableLst, colContainer) //makeVenn returns the venn number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.
colGen.addImage(colNum, 1, 'https://www.apple.com/v/airpods-max/d/images/overview/hero__gnfk5g59t0qe_xlarge.png')
colGen.addImage(colNum, 2, 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2017/12/boseqc35.png')
colGen.addImage(colNum, 3, 'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=440')

const colText = document.createElement("p")
colText.appendChild(document.createTextNode(`Similar to the Table Row Generator, the Table Column Generator is an excellent choice to display product information in a concise and easy to understand way.
The Table Column Generator provides the developer with an alternative styling option for the table matrix design in which each product is represented by column instead of a row. Depending on the design of 
the web app and the developer's preferences, the presence of the Table Column Generator gives the developer the freedom to choose between which table format they prefer and offers the same functionality as 
is included with the Table Row Generator. See the API documentation for more details regarding the full functionality of the Table Row Generator.`))
colContainer.appendChild(colText)

page.appendChild(colContainer)





