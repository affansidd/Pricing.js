"use strict";

(function (global, document) {
    const check = './icons/check_black_24dp (1).png'
    const cross = './icons/close_black_24dp (2).png'

    function TreeGenerator() {
        //Constructor for the binarytree generator

        this.trees = [] //array storing each tree that this generator has created
        this.numTrees = 0; //count of the number of trees this generator has created
    }

    TreeGenerator.prototype = {
        makeTree: function (info, container) {
            const parent = document.createElement("div");
            parent.classList.add("tree")
            const tree = {
                info: info,
                nodeList: [],
                element: parent
            }
            const listHead = document.createElement("ul");
            listHead.appendChild(recursiveTree(info, tree.nodeList))
            parent.appendChild(listHead)
            this.trees.push(tree)
            this.numTrees += 1
            container.appendChild(parent)
            return this.numTrees //returns the tree number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the tree.
        },


        changeColor: function (treeNum, nodeValue, color) {
            if (treeNum <= this.numTrees) {
                const tree = this.trees[treeNum - 1]
                const node = tree.nodeList.filter(node => node.value === nodeValue)[0]
                if (node === null) {
                    console.log('changeColor: invalid nodeValue')
                    return
                }
                node.color = color
                const nodes = tree.element.querySelectorAll("p")
                for (var i = 0; i < nodes.length; i++) {
                    console.log(nodes[i].innerText)
                    if (nodes[i].childNodes[0].nodeValue === nodeValue) {
                        console.log(nodes[i])
                        nodes[i].style.backgroundColor = color
                    }
                }
                console.log(node)
            } else {
                console.log('changeColor: invalid treeNum')
            }
        },

        addChild: function (treeNum, parentValue, newNode) {
            if (treeNum > this.numTrees) {
                console.log('addChild: invalid treeNum')
                return
            }
            const tree = this.trees[treeNum - 1]
            const parentNode = tree.nodeList.filter(node => node.value === parentValue)[0]
            if (parentNode === null) {
                console.log('addChild: invalid parentNode')
                return
            }
            parentNode.children.push(newNode)
            const nodes = tree.element.querySelectorAll("p")
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].childNodes[0].nodeValue === parentValue) {
                    if (nodes[i].parentNode.childNodes.length === 1) { //parent is a leaf
                        const childrenContainer = document.createElement("ul")
                        childrenContainer.appendChild(recursiveTree(newNode, tree.nodeList))
                        nodes[i].parentNode.appendChild(childrenContainer)
                    } else {
                        nodes[i].parentNode.childNodes[1].appendChild(recursiveTree(newNode, tree.nodeList))
                    }
                    break;
                }

            }
        },

        deleteChild: function (treeNum, nodeValue) {
            if (treeNum > this.numTrees) {
                console.log('deleteChild: invalid treeNum')
                return
            }
            const tree = this.trees[treeNum - 1]
            const len = tree.nodeList.length
            tree.nodeList = tree.nodeList.filter(node => node.value !== nodeValue)
            if (len === tree.nodeList.length) {
                console.log('deleteChild: invalid nodeValue')
                return
            }
            const nodes = tree.element.querySelectorAll("p")
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].childNodes[0].nodeValue === nodeValue) {
                    const nodeContainer = nodes[i].parentNode
                    if (nodeContainer.parentNode.childNodes.length === 1) { //node has no siblings
                        const grandParent = nodeContainer.parentNode.parentNode
                        grandParent.removeChild(nodeContainer.parentNode)
                    } else {
                        nodeContainer.parentNode.removeChild(nodeContainer)
                    }
                    break;
                }

            }
        },

        changeNodeText: function (treeNum, oldNodeValue, newNodeValue) {
            if (treeNum > this.numTrees) {
                console.log('changeNodeText: invalid treeNum')
                return
            }
            const tree = this.trees[treeNum - 1]
            const node = tree.nodeList.filter(node => node.value === oldNodeValue)[0]
            if (node === null) {
                console.log('changeNodeText: invalid oldNodeValue')
            }
            node.value = newNodeValue
            const nodes = tree.element.querySelectorAll("p")
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].childNodes[0].nodeValue === oldNodeValue) {
                    nodes[i].childNodes[0].nodeValue = newNodeValue
                }
            }
        },

        changePopupText: function (treeNum, nodeValue, newPopupText) {
            if (treeNum > this.numTrees) {
                console.log('changePopupText: invalid treeNum')
                return
            }
            const tree = this.trees[treeNum - 1]
            const node = tree.nodeList.filter(node => node.value === nodeValue)[0]
            if (node === null) {
                console.log('changePopupText: invalid nodeValue')
            }
            node.text = newPopupText
            const nodes = tree.element.querySelectorAll("p")
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].childNodes[0].nodeValue === nodeValue) {
                    nodes[i].childNodes[1].innerText = newPopupText
                }
            }
        }


    }

    function PyramidGenerator() {
        //Constructor for the pyramid generator

        this.pyramids = [] //array storing each pyramid that this generator has created
        this.numPyramids = 0; //count of the number of pyramid this generator has created
    }

    PyramidGenerator.prototype = {
        makePyramid: function (info, container) {
            if (info.length > 4 || info.length < 3) { //only support pyramids of level 3 or 4
                console.log('makePyramid: invalid info argument: only support pyramid of size 3 or 4')
                return;
            }
            const pyramid_container = document.createElement("div");
            pyramid_container.classList.add("pyramid_container");

            const pyramid = {
                info: JSON.parse(JSON.stringify(info)),
                element: pyramid_container
            }
            let i = 3;
            info.map(section => {
                const pyramid_level = document.createElement("div")
                pyramid_level.classList.add("pyramid_section_" + i)
                pyramid_level.classList.add("item")
                pyramid_level.style.borderBottomColor = section.color
                const value = document.createElement("p")
                value.appendChild(document.createTextNode(section.value))
                if (i === 3) {
                    value.classList.add("pyramid_text_top")
                } else {
                    value.classList.add("pyramid_text")
                }
                pyramid_level.appendChild(value)
                if ('text' in section) {
                    const text = document.createElement("span");
                    text.appendChild(document.createTextNode(section.text))
                    text.classList.add("itemtext")
                    pyramid_level.appendChild(text)
                    pyramid_level.addEventListener('mouseenter', displayItemInfo)
                    pyramid_level.addEventListener('mouseleave', displayItemInfo)
                }


                i -= 1
                pyramid_container.appendChild(pyramid_level)
            })

            container.appendChild(pyramid_container)
            this.pyramids.push(pyramid)
            this.numPyramids += 1
            return this.numPyramids //returns the pyramid number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the pyramid.

        },

        addBase: function (pyramidNum, baseInfo) {
            if (pyramidNum > this.numPyramids) {
                console.log('addBase: invalid pyramidNum')
                return
            }
            const pyramid = this.pyramids[pyramidNum - 1]

            if (pyramid.info.length > 3) { //don't support more than 4 sections
                console.log('addBase: max number of sections already reached, only support 3 or 4 level pyramids')
                return
            }

            pyramid.info.push(baseInfo)

            const pyramid_level = document.createElement("div")
            pyramid_level.classList.add("pyramid_section_0")
            pyramid_level.classList.add("item")
            pyramid_level.style.borderBottomColor = baseInfo.color
            const value = document.createElement("p")
            value.appendChild(document.createTextNode(baseInfo.value))
            value.classList.add("inside-text")
            pyramid_level.appendChild(value)
            if ('text' in baseInfo) {
                const text = document.createElement("span");
                text.appendChild(document.createTextNode(baseInfo.text))
                text.classList.add("itemtext")
                pyramid_level.appendChild(text)
                pyramid_level.addEventListener('mouseenter', displayItemInfo)
                pyramid_level.addEventListener('mouseleave', displayItemInfo)
            }

            pyramid.element.appendChild(pyramid_level)
        },

        removeBase: function (pyramidNum) {
            if (pyramidNum > this.numPyramids) {
                console.log('removeBase: invalid pyramidNum')
                return
            }
            const pyramid = this.pyramids[pyramidNum - 1]

            if (pyramid.info.length < 4) { //don't support less than 3 sections
                console.log('removeBase: min number of sections already reached, only support 3 or 4 level pyramids')
                return
            }

            pyramid.info.pop() //remove the object associated with the base

            const base = pyramid.element.lastChild
            pyramid.element.removeChild(base)

        },

        changeSectionColor: function (pyramidNum, sectionIndex, color) {
            if (pyramidNum > this.numPyramids) {
                console.log('changeSectionColor: invalid pyramidNum')
                return
            }
            const pyramid = this.pyramids[pyramidNum - 1]
            if (sectionIndex >= pyramid.info.length) { //out of bounds
                console.log('changeSectionColor: sectionIndex out of bounds')
                return
            }
            pyramid.info[sectionIndex].color = color
            pyramid.element.childNodes[sectionIndex].style.borderBottomColor = color
        },

        changeSectionText: function (pyramidNum, sectionIndex, newSectionText) {
            if (pyramidNum > this.numPyramids) {
                console.log('changeSectionText: invalid pyramidNum')
                return
            }
            const pyramid = this.pyramids[pyramidNum - 1]
            if (sectionIndex >= pyramid.info.length) { //out of bounds
                console.log('changeSectionText: sectionIndex out of bounds')
                return
            }
            pyramid.info[sectionIndex].value = newSectionText
            pyramid.element.childNodes[sectionIndex].childNodes[0].innerText = newSectionText
        },

        changePopupText: function (numPyramid, sectionIndex, newPopupText) {
            if (numPyramid > this.numPyramids) {
                console.log('changePopupText: invalid pyramidNum')
                return
            }
            const pyramid = this.pyramids[numPyramid - 1]
            if (sectionIndex >= pyramid.info.length) { //out of bounds
                console.log('changePopupText: sectionIndex out of bounds')
                return
            }
            pyramid.info[sectionIndex].text = newPopupText
            pyramid.element.childNodes[sectionIndex].childNodes[1].innerText = newPopupText
        }
    }

    function TableRowGenerator() {
        //Constructor for the table generator

        this.tables = [] //array storing each table that this generator has created
        this.numTables = 0; //count of the number of table this generator has created
    }

    TableRowGenerator.prototype = {
        makeTable: function (info, container) {
            const table = document.createElement('table');
            table.classList.add("table")
            const fields = Object.keys(info[0]).filter(field => {
                return field !== 'text'
            }) //all objects in the array must have the exact same fields, the description field, if included, will displayed in a pop-up so we don't want it to be a header in the table
            const row = document.createElement('tr')
            row.classList.add('table_contents')
            table.appendChild(row)

            const table_object = {
                info: JSON.parse(JSON.stringify(info)),
                fields: JSON.parse(JSON.stringify(fields)),
                element: table
            }

            fields.map(label => { //create the top header row of the table
                const header = document.createElement('th')
                header.classList.add('table_contents')
                header.appendChild(document.createTextNode(label))
                row.appendChild(header)
            })
            info.map(item => { //each product represents a row in the table. This loop will generate a row for each product in info
                const row = createRow(fields, item) //helper function to create a row in the table
                table.appendChild(row)
            })
            container.appendChild(table)
            this.tables.push(table_object)
            this.numTables += 1
            return this.numTables //returns the table number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the table.
        },

        appendProduct: function (tableNum, productInfo) { //add a new row to the end of the table
            if (tableNum > this.numTables) {
                console.log('appendProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const row = createRow(table.fields, productInfo)
            table.element.appendChild(row)
            table.info.push(JSON.parse(JSON.stringify(productInfo)))
        },

        insertProduct: function (tableNum, productInfo, rowNum) { //add a new row to the table at a given index
            if (tableNum > this.numTables) {
                console.log('insertProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const row = createRow(table.fields, productInfo)
            table.element.insertBefore(row, table.element.childNodes[rowNum])
            table.info.splice(rowNum - 1, 0, JSON.parse(JSON.stringify(productInfo)))
        },

        removeProduct: function (tableNum, rowNum) { //remove a row from the table
            if (tableNum > this.numTables) {
                console.log('removeProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const rowToDelete = table.element.childNodes[rowNum]
            table.element.removeChild(rowToDelete)
            table.info.splice(rowNum - 1, 1)
        },

        addHeader: function (tableNum, newHeaderInfo) {
            if (tableNum > this.numTables) {
                console.log('addHeader: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            // newHeaderInfo = ['header', true, false, 'apple', false, 'n/a'] <- expected format of newHeaderInfo
            if (newHeaderInfo.length === table.info.length + 1 && typeof (newHeaderInfo[0]) === 'string') {
                const newHeader = newHeaderInfo[0]
                table.fields.push(newHeader)

                const headerElement = document.createElement('th')
                headerElement.appendChild(document.createTextNode(newHeader))
                table.element.childNodes[0].appendChild(headerElement)

                table.element.childNodes[0]
                for (let i = 0; i < table.info.length; i++) {
                    const product = table.info[i]
                    product[newHeader] = newHeaderInfo[i + 1]

                    const cell = document.createElement('td')
                    if (typeof (product[newHeader]) === 'boolean') { //if the value is a boolean, we use a checkmark/cross to represent it in the table
                        const img = document.createElement('img')
                        product[newHeader] ? img.src = check : img.src = cross
                        cell.appendChild(img)
                    } else { //otherwise simply insert the text value of the field
                        cell.appendChild(document.createTextNode(product[newHeader]))
                    }
                    table.element.childNodes[i + 1].appendChild(cell)
                }
            } else {
                console.log("addHeader: invalid newHeaderInfo argument");
                return
            }
        },

        changeHeader: function (tableNum, newHeader, oldHeaderIndex) {
            if (tableNum > this.numTables) {
                console.log('changeHeader: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            if (oldHeaderIndex >= table.fields.length) {
                console.log("changeHeader: invalid oldHeaderIndex")
                return
            }
            const oldHeader = table.fields[oldHeaderIndex]
            table.fields[oldHeaderIndex] = newHeader
            table.info.map(product => {
                product[newHeader] = product[oldHeader]
                delete product[oldHeader]
            })
            table.element.childNodes[0].childNodes[oldHeaderIndex].innerText = newHeader
        },

        changeCellInfo: function (tableNum, row, col, newValue) {
            if (tableNum > this.numTables) {
                console.log('changeCellInfo: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const cell = table.element.childNodes[row].childNodes[col]
            if (cell === null) {
                console.log('changeCellColor: invalid row, col arguments')
                return
            } 
            const product = table.info[row - 1]
            const header = table.fields[col]

            changeCellValue(cell, product, header, newValue)

        },

        changeCellColor: function (tableNum, row, col, color) {
            if (tableNum > this.numTables) {
                console.log('changeCellColor: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const cell = table.element.childNodes[row].childNodes[col]
            if (cell === null) {
                console.log('changeCellColor: invalid row, col arguments')
                return
            } 
            cell.style.backgroundColor = color
        },

        changeTableWidth: function (tableNum, newWidth) {
            if (tableNum > this.numTables) {
                console.log('changeTableWidth: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            table.element.style.width = newWidth
        },

        addProductDescription: function (tableNum, row, description) {
            if (tableNum > this.numTables) {
                console.log('addProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('addProductDescription: invalid row argument')
                return
            }
            if ('text' in product) {
                console.log('addProductDescription: this product already has a description, use changeProductDescription to update')
                return
            }
            product['text'] = description
            const cell = table.element.childNodes[row].childNodes[0]
            generateCellPopup(cell, product)
        },

        changeProductDescription: function (tableNum, row, newDescription) {
            if (tableNum > this.numTables) {
                console.log('changeProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('changeProductDescription: invalid row argument')
                return
            }
            if (!('text' in product)) {
                console.log('changeProductDescription: this product does not have a description, use addProductDescription to add')
                return
            }
            product['text'] = newDescription
            const cell = table.element.childNodes[row].childNodes[0]
            cell.childNodes[1].innerText = newDescription
        },

        removeProductDescription: function (tableNum, row) {
            if (tableNum > this.numTables) {
                console.log('removeProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('removeProductDescription: invalid row argument')
                return
            }
            if (!('text' in product)) {
                console.log('removeProductDescription: this product does not have a description')
                return
            }
            delete product['text']
            const cell = table.element.childNodes[row].childNodes[0]
            cell.removeChild(cell.childNodes[1])
            cell.removeEventListener('mouseenter', displayItemInfo)
            cell.removeEventListener('mouseleave', displayItemInfo)
        },

        addImage: function (tableNum, row, img) {
            if (tableNum > this.numTables) {
                console.log('addImage: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('addImage: invalid row argument')
                return
            }
            if ('img' in product) {
                console.log('addImage: this product already has an image, use changeImage to update')
            }
            product['img'] = img
            const cell = table.element.childNodes[row].childNodes[0]
            addImage(cell, img)
        },

        removeImage: function (tableNum, row) {
            if (tableNum > this.numTables) {
                console.log('removeImage: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('removeImage: invalid row argument')
                return
            }
            if (!('text' in product)) {
                console.log('removeImage: this product does not have an image')
                return
            }
            delete product['img']
            const cell = table.element.childNodes[row].childNodes[0]
            removeImage(cell, product)
        },

        changeImage: function (tableNum, row, img) {
            if (tableNum > this.numTables) {
                console.log('changeImage: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[row - 1]
            if (product === null) {
                console.log('changeImage: invalid row argument')
                return
            }
            if (!('text' in product)) {
                console.log('changeImage: this product does not have an image, use addImage to add')
                return
            }
            product['img'] = img
            const cell = table.element.childNodes[row].childNodes[0]
            changeImage(cell, img)
        }
    }

    function TableColumnGenerator() {
        //Constructor for the table generator

        this.tables = [] //array storing each table that this generator has created
        this.numTables = 0; //count of the number of table this generator has created
    }

    TableColumnGenerator.prototype = {
        makeTable: function (info, container) {
            const table = document.createElement('table');
            table.classList.add("table")
            const fields = Object.keys(info[0]).filter(field => {
                return field !== 'text'
            }) //all objects in the array must have the exact same fields, the description field, if included, will displayed in a pop-up so we don't want it to be a header in the table

            const table_object = {
                info: JSON.parse(JSON.stringify(info)),
                fields: fields,
                element: table
            }

            fields.map(field => {
                const row = document.createElement('tr')
                row.classList.add('table_contents')
                const header = document.createElement('th')
                header.classList.add('table_contents')
                header.appendChild(document.createTextNode(field + ':'))
                row.appendChild(header)
                info.map(product => {
                    const cell = createCell(field, product)
                    row.appendChild(cell)
                })
                table.appendChild(row)
            })

            container.appendChild(table)
            this.tables.push(table_object)
            this.numTables += 1
            return this.numTables //returns the table number of the new chart that was created by this object. This value can be used for dynamically changing the contents of the table.
        },

        appendProduct: function (tableNum, productInfo) { //add a new column to the table
            if (tableNum > this.numTables) {
                console.log('appendProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            table.info.push(JSON.parse(JSON.stringify(productInfo)))

            for (let i = 0; i < table.fields.length; i++) {
                const cell = createCell(table.fields[i], productInfo)
                table.element.childNodes[i].appendChild(cell)
            }

        },

        insertProduct: function (tableNum, productInfo, colNum) {
            if (tableNum > this.numTables) {
                console.log('insertProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            table.info.splice(colNum - 1, 0, JSON.parse(JSON.stringify(productInfo)))
            for (let i = 0; i < table.fields.length; i++) {
                const cell = createCell(table.fields[i], productInfo)
                table.element.childNodes[i].insertBefore(cell, table.element.childNodes[i].childNodes[colNum])
            }
        },

        removeProduct: function (tableNum, colNum) { //remove a column from the table
            if (tableNum > this.numTables) {
                console.log('removeProduct: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            for (let i = 0; i < table.fields.length; i++) {
                table.element.childNodes[i].removeChild(table.element.childNodes[i].childNodes[colNum])
            }
            table.info.splice(colNum - 1, 1)
        },

        addHeader: function (tableNum, newHeaderInfo) {
            if (tableNum > this.numTables) {
                console.log('addHeader: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            if (newHeaderInfo.length === table.info.length + 1 && typeof (newHeaderInfo[0]) === 'string') {
                const newHeader = newHeaderInfo[0]
                table.fields.push(newHeader)
                const row = document.createElement('tr')
                row.classList.add('table_contents')
                const header = document.createElement('th')
                header.classList.add('table_contents')
                header.appendChild(document.createTextNode(newHeader + ':'))
                row.appendChild(header)
                for (let i = 0; i < table.info.length; i++) {
                    const product = table.info[i]
                    product[newHeader] = newHeaderInfo[i + 1]
                    const cell = createCell(newHeader, product)
                    row.appendChild(cell)
                }
                table.element.appendChild(row)
            } else {
                console.log("invalid newHeaderInfo argument");
                return
            }

        },

        changeHeader: function (tableNum, newHeader, oldHeaderIndex) {
            if (tableNum > this.numTables) {
                console.log('changeHeader: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            if (oldHeaderIndex >= table.fields.length) {
                console.log("changeHeader: invalid oldHeaderIndex")
                return
            }
            const oldHeader = table.fields[oldHeaderIndex]
            table.fields[oldHeaderIndex] = newHeader
            table.info.map(product => {
                product[newHeader] = product[oldHeader]
                delete product[oldHeader]
            })
            table.element.childNodes[oldHeaderIndex].childNodes[0].innerText = newHeader + ':'
        },

        changeCellInfo: function (tableNum, row, col, newValue) {
            if (tableNum > this.numTables) {
                console.log('changeCellInfo: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const cell = table.element.childNodes[row].childNodes[col]
            if (cell === null) {
                console.log('changeCellColor: invalid row, col arguments')
                return
            } 
            const product = table.info[col - 1]
            const header = table.fields[row]

            changeCellValue(cell, product, header, newValue)

        },

        changeCellColor: function (tableNum, row, col, color) {
            if (tableNum > this.numTables) {
                console.log('changeCellColor: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const cell = table.element.childNodes[row].childNodes[col]
            if (cell === null) {
                console.log('changeCellColor: invalid row, col arguments')
                return
            } 
            cell.style.backgroundColor = color
        },

        changeTableWidth: function (tableNum, newWidth) {
            if (tableNum > this.numTables) {
                console.log('changeTableWidth: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            table.element.style.width = newWidth
        },

        addProductDescription: function (tableNum, col, description) {
            if (tableNum > this.numTables) {
                console.log('addProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            if (product === null) {
                console.log('addProductDescription: invalid col argument')
                return
            }
            if ('text' in product) {
                console.log('addProductDescription: this product already has a description, use changeProductDescription to update')
                return
            }
            product['text'] = description
            const cell = table.element.childNodes[0].childNodes[col]
            generateCellPopup(cell, product)
        },

        changeProductDescription: function (tableNum, col, newDescription) {
            if (tableNum > this.numTables) {
                console.log('changeProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            if (product === null) {
                console.log('changeProductDescription: invalid col argument')
                return
            }
            if (!('text' in product)) {
                console.log('changeProductDescription: this product does not have a description, use addProductDescription to add')
                return
            }
            product['text'] = newDescription
            const cell = table.element.childNodes[0].childNodes[col]
            cell.childNodes[1].innerText = newDescription
        },

        removeProductDescription: function (tableNum, col) {
            if (tableNum > this.numTables) {
                console.log('removeProductDescription: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            if (product === null) {
                console.log('removeProductDescription: invalid col argument')
                return
            }
            if (!('text' in product)) {
                console.log('removeProductDescription: this product does not have a description')
                return
            }
            delete product['text']
            const cell = table.element.childNodes[0].childNodes[col]
            cell.removeChild(cell.childNodes[1])
            cell.removeEventListener('mouseenter', displayItemInfo)
            cell.removeEventListener('mouseleave', displayItemInfo)
        },

        addImage: function (tableNum, col, img) {
            if (tableNum > this.numTables) {
                console.log('addImage: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            if (product === null) {
                console.log('addImage: invalid col argument')
                return
            }
            if ('img' in product) {
                console.log('addImage: this product already has an image, use changeImage to update')
            }
            product['img'] = img
            const cell = table.element.childNodes[0].childNodes[col]
            addImage(cell, img)
        },

        removeImage: function (tableNum, col) {
            if (tableNum > this.numTables) {
                console.log('removeImage: invalid tableNum')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            if (product === null) {
                console.log('removeImage: invalid col argument')
                return
            }
            if (!('text' in product)) {
                console.log('removeImage: this product does not have an image')
                return
            }
            delete product['img']
            const cell = table.element.childNodes[0].childNodes[col]
            removeImage(cell, product)
        },

        changeImage: function (tableNum, col, img) {
            if (tableNum > this.numTables) {
                console.log('changeImage: invalid tableNum')
                return
            }
            if (product === null) {
                console.log('changeImage: invalid col argument')
                return
            }
            if (!('text' in product)) {
                console.log('changeImage: this product does not have an image, use addImage to add')
                return
            }
            const table = this.tables[tableNum - 1]
            const product = table.info[col - 1]
            product['img'] = img
            const cell = table.element.childNodes[0].childNodes[col]
            changeImage(cell, img)
        }
    }

    function VennDiagramGenerator() {

        this.diagrams = [] //array storing each venn diagram that this generator has created
        this.numDiagrams = 0 //count of the number of diagrams this generator has created
    }

    VennDiagramGenerator.prototype = {
        makeVenn: function (info, container) {
            const venn_ctn = document.createElement('div')
            venn_ctn.classList.add('venn-container')

            const left = document.createElement('div')
            left.classList.add('left')

            populateDiv(left, info[0])

            const center = document.createElement('div')
            center.classList.add('center')

            populateDiv(center, info[1])

            const right = document.createElement('right')
            right.classList.add('right')

            populateDiv(right, info[2])

            venn_ctn.appendChild(left)
            venn_ctn.appendChild(center)
            venn_ctn.appendChild(right)
            const venn = {
                element: venn_ctn,
                info: JSON.parse(JSON.stringify(info))
            }
            container.appendChild(venn_ctn)
            this.diagrams.push(venn)
            this.numDiagrams += 1
            return this.numDiagrams
        },

        changeColor: function (vennNum, sectionIndex, newColor) {
            if (vennNum > this.numDiagrams) {
                console.log('changeColor: invalid vennNum')
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (!(0 <= sectionIndex <= 2)) {
                console.log("changeColor: invalidSectionIndex")
                return
            }
            venn.info[sectionIndex].color = newColor
            venn.element.childNodes[sectionIndex].style.backgroundColor = newColor
        },

        changeSectionHeader: function (vennNum, sectionIndex, newHeader) {
            if (vennNum > this.numDiagrams) {
                console.log('changeSectionHeader: invalid vennNum')
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (!(0 <= sectionIndex <= 2)) {
                console.log("changeSectionHeader: invalidSectionIndex")
                return
            }
            venn.element.childNodes[sectionIndex].childNodes[0].innerText = newHeader
            venn.info[sectionIndex].header = newHeader
        },

        changeVennSize: function (vennNum, dimensions) {
            //dimensions = ['height', 'left-width', 'center-width', 'right-width'] <- expected format of dimensions
            if (vennNum > this.numDiagrams) {
                console.log('changeVennSize: invalid vennNum')
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (dimensions.length !== 4) {
                console.log("changeVennSize: invalid dimensions")
                return
            }
            for (let i = 0; i < 3; i++) {
                venn.element.childNodes[i].style.height = dimensions[0]
                venn.element.childNodes[i].style.width = dimensions[i + 1]
            }
        },

        changeSectionDetails: function (vennNum, sectionIndex, newDetails) {
            if (vennNum > this.numDiagrams) {
                console.log('changeSectionDetails: invalid vennNum')
                return
            }
            if (!(0 <= sectionIndex <= 2)) {
                console.log("changeSectionDetails: invalidSectionIndex")
                return
            }
            const venn = this.diagrams[vennNum - 1]
            let details
            if (typeof (newDetails) === 'string') {
                details = document.createElement('p')
                details.classList.add('details')
                details.appendChild(document.createTextNode(newDetails))
            } else {
                details = document.createElement('ul')
                newDetails.map(detail => {
                    const li = document.createElement('li')
                    li.appendChild(document.createTextNode(detail))
                    details.appendChild(li)
                })
            }
            const oldDetails = venn.element.childNodes[sectionIndex].childNodes[1]
            venn.element.childNodes[sectionIndex].removeChild(oldDetails)
            venn.element.childNodes[sectionIndex].appendChild(details)
            venn.info[sectionIndex].details = newDetails
        },

        addImage: function (vennNum, sectionIndex, photoSrc) {
            if (vennNum > this.numDiagrams) {
                console.log('addImage: invalid vennNum')
                return
            }
            if (!(0 <= sectionIndex <= 2)) {
                console.log("addImage: invalidSectionIndex")
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if ('img' in venn.info[sectionIndex]) {
                console.log('addImage: this section already has an image, use changeImage to update')
                return
            }
            venn.info[sectionIndex].img = photoSrc
            const img = document.createElement('img')
            img.src = photoSrc
            venn.element.childNodes[sectionIndex].insertBefore(img, venn.element.childNodes[sectionIndex].childNodes[1])
        },

        removeImage: function (vennNum, sectionIndex) {
            if (vennNum > this.numDiagrams) {
                console.log('removeImage: invalid vennNum')
                return
            }
            if (!(0 <= sectionIndex <= 2)) {
                console.log("removeImage: invalidSectionIndex")
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (!('img' in venn.info[sectionIndex])) {
                console.log('removeImage: this section does not have an image')
                return
            }
            delete venn.info[sectionIndex].img
            venn.element.childNodes[sectionIndex].removeChild(venn.element.childNodes[sectionIndex].childNodes[1])
        },

        changeImage: function (vennNum, sectionIndex, newPhoto) {
            if (vennNum > this.numDiagrams) {
                console.log('changeImage: invalid vennNum')
                return
            }
            if (!(0 <= sectionIndex <= 2)) {
                console.log("changeImage: invalidSectionIndex")
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (!('img' in venn.info[sectionIndex])) {
                console.log('changeImage: this section does not have an image, use addImage to add')
                return
            }
            venn.info[sectionIndex].img = newPhoto
            venn.element.childNodes[sectionIndex].childNodes[1].src = newPhoto
        },

        changeImageSize: function (vennNum, sectionIndex, newWidth, newHeight) {
            if (vennNum > this.numDiagrams) {
                console.log('changeImageSize: invalid vennNum')
                return
            }
            if (!(0 <= sectionIndex <= 2)) {
                console.log("changeImageSize: invalidSectionIndex")
                return
            }
            const venn = this.diagrams[vennNum - 1]
            if (!('img' in venn.info[sectionIndex])) {
                console.log('changeImageSize: this section does not have an image')
                return
            }
            venn.element.childNodes[sectionIndex].childNodes[1].style.width = newWidth
            venn.element.childNodes[sectionIndex].childNodes[1].style.height = newHeight
        }

    }

    function PriceCardGenerator() {
        this.cards = []
        this.numCards = 0
    }

    PriceCardGenerator.prototype = {
        makeCard: function (info, container) {
            const card = document.createElement('div')
            card.classList.add('priceCard')
            const name = document.createElement('h1')
            name.appendChild(document.createTextNode(info.name))
            card.appendChild(name)
            if ('img' in info) {
                const img_ctn = document.createElement('div')
                img_ctn.classList.add('product_img_ctn')
                const img = document.createElement('img')
                img.src = info.img
                img.classList.add('product_img')
                img_ctn.appendChild(img)
                card.appendChild(img_ctn)
            }

            const fields = Object.keys(info).filter(field => {
                return field !== 'img' && field !== 'frequency' && field !== 'price' && field !== 'name'
            })

            const details = document.createElement('div')
            details.classList.add('details')
            const list = document.createElement('ul')
            fields.map(field => {
                const li = document.createElement('li')
                const bullet = document.createElement('img')
                info[field] ? bullet.src = check : bullet.src = cross
                li.appendChild(bullet)
                li.appendChild(document.createTextNode(field))
                list.appendChild(li)
            })

            details.appendChild(list)
            card.appendChild(details)

            const price = document.createElement('p')
            price.appendChild(document.createTextNode(info['price'][0]))
            const value = document.createElement('span')
            value.appendChild(document.createTextNode(info.price.slice(1)))
            price.appendChild(value)
            if (info.frequency) {
                price.appendChild(document.createTextNode('/' + info.frequency))
            }
            card.appendChild(price)
            container.appendChild(card)
            const card_object = {
                info: JSON.parse(JSON.stringify(info)),
                element: card,
                fields: fields
            }
            this.cards.push(card_object)
            this.numCards += 1
            return this.numCards
        },

        changeName: function (cardNum, newName) {
            if (cardNum > this.numCards) {
                console.log('changeName: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            card.info.name = newName;
            card.element.childNodes[0].innerText = newName
        },

        changeColor: function (cardNum, newColor) {
            if (cardNum > this.numCards) {
                console.log('changeColor: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            card.info.color = newColor
            card.element.style.backgroundImage = `linear-gradient(45deg, rgba(255,0,0,0), ${newColor})`
        },

        changePrice: function (cardNum, newPrice, newFrequency) {
            if (cardNum > this.numCards) {
                console.log('changePrice: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            card.element.removeChild(card.element.lastChild)
            const price = document.createElement('p')
            price.appendChild(document.createTextNode(newPrice[0]))
            const value = document.createElement('span')
            value.appendChild(document.createTextNode(newPrice.slice(1)))
            price.appendChild(value)
            if (newFrequency) {
                price.appendChild(document.createTextNode('/' + newFrequency))
            }
            card.element.appendChild(price)
            card.info.price = newPrice
            card.info.frequency = newFrequency
        },

        insertField: function (cardNum, newField, value, fieldIndex) {
            if (cardNum > this.numCards) {
                console.log('insertField: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            card.fields.push(newField)
            card.info[newField] = value

            const li = document.createElement('li')
            const bullet = document.createElement('img')
            card.info[newField] ? bullet.src = check : bullet.src = cross
            li.appendChild(bullet)
            li.appendChild(document.createTextNode(newField))
            const list = card.element.getElementsByTagName('ul')[0]
            if (fieldIndex && list.childNodes[fieldIndex] === null) {
                console.log('insertField: invalid fieldIndex')
                return
            }
            fieldIndex ? list.insertBefore(li, list.childNodes[fieldIndex]) : list.appendChild(li)

        },

        changeField: function (cardNum, newField, fieldIndex) {
            if (cardNum > this.numCards) {
                console.log('changeField: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            const oldField = card.fields[fieldIndex]
            card.fields[fieldIndex] = newField
            card.info[newField] = card.info[oldField]
            delete card.info[oldField]
            const list = card.element.getElementsByTagName('ul')[0]
            const listElement = list.childNodes[fieldIndex]
            if (listElement === null) {
                console.log('changeField: invalid fieldIndex')
            }
            listElement.removeChild(listElement.childNodes[1])
            listElement.appendChild(document.createTextNode(newField))

        },

        changeValue: function (cardNum, fieldIndex, newValue) {
            if (cardNum > this.numCards) {
                console.log('changeValue: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            const field = card.fields[fieldIndex]
            card.info[field] = newValue
            const list = card.element.getElementsByTagName('ul')[0]
            const listElement = list.childNodes[fieldIndex]
            if (listElement === null) {
                console.log('changeValue: invalid fieldIndex')
            }
            newValue ? listElement.childNodes[0].src = check : listElement.childNodes[0].src = cross
        },

        addImage: function (cardNum, imgSrc) {
            if (cardNum > this.numCards) {
                console.log('addImage: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            if ('img' in card.info) {
                console.log('addImage: this Price Card already has an image, use changeImage to update')
                return
            }
            card.info.img = imgSrc
            const img_ctn = document.createElement('div')
            img_ctn.classList.add('product_img_ctn')
            const img = document.createElement('img')
            img.src = card.info.img
            img.classList.add('product_img')
            img_ctn.appendChild(img)
            card.element.insertBefore(img_ctn, card.element.childNodes[1])
        },

        removeImage: function (cardNum) {
            if (cardNum > this.numCards) {
                console.log('removeImage: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            if (!('img' in card.info)) {
                console.log('removeImage: this Price Card does not have an image')
                return
            }
            delete card.info.img
            card.element.removeChild(card.element.childNodes[1])
        },

        changeImage: function (cardNum, newImg) {
            if (cardNum > this.numCards) {
                console.log('changeImage: invalid cardNum')
            }
            const card = this.cards[cardNum - 1]
            if (!('img' in card.info)) {
                console.log('changeImage: this Price Card does not have an image, use addImage to add')
                return
            }
            const img = card.element.childNodes[1].childNodes[0]
            img.src = newImg
            card.info.img = newImg

        },



    }


    /*---------------------------------Helper functions meant to be private-------------------------------------- */

    function populateDiv(parent, obj) {
        if ('color' in obj) {
            parent.style.backgroundColor = obj.color
        }
        const header = document.createElement('h3')
        header.classList.add('product-header')
        header.appendChild(document.createTextNode(obj.header))
        parent.appendChild(header)
        if (typeof (obj.details) === 'string') {
            const details = document.createElement('p')
            details.classList.add('description')
            details.appendChild(document.createTextNode(obj.details))
            parent.appendChild(details)
        } else {
            const details = document.createElement('ul')
            obj.details.map(detail => {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(detail))
                details.appendChild(li)
            })
            parent.appendChild(details)
        }
    }

    function changeImage(cell, src) {
        const img_ctn = cell.childNodes[0]
        const img = img_ctn.childNodes[0]
        img.src = src
    }
    function removeImage(cell, product) {
        cell.removeChild(cell.childNodes[0])
        cell.insertBefore(document.createTextNode(product.Name), cell.childNodes[0])
    }

    function addImage(cell, src) {
        const name = cell.childNodes[0]
        cell.removeChild(name)
        const ctn = document.createElement('div')
        ctn.classList.add('img_ctn')
        const img = document.createElement('img')
        img.src = src
        ctn.appendChild(img)
        ctn.appendChild(name)
        cell.insertBefore(ctn, cell.childNodes[0])

    }

    function generateCellPopup(cell, product) {
        const text = document.createElement("span");
        text.appendChild(document.createTextNode(product['text']))
        text.classList.add("itemtext")
        cell.classList.add("item")
        cell.appendChild(text)
        cell.addEventListener('mouseenter', displayItemInfo)
        cell.addEventListener('mouseleave', displayItemInfo)
    }

    function changeCellValue(cell, product, header, newValue) {
        if (typeof (product[header]) === 'boolean') {
            if (typeof (newValue) === 'boolean') {
                console.log(product[header], newValue)
                newValue ? cell.childNodes[0].src = check : cell.childNodes[0].src = cross
            } else {
                cell.removeChild(cell.childNodes[0])
                cell.appendChild(document.createTextNode(newValue))
            }
        } else {
            if (typeof (newValue) === 'boolean') {
                cell.removeChild(cell.childNodes[0])
                const img = document.createElement('img')
                newValue ? img.src = check : img.src = cross
                cell.appendChild(img)
            } else {
                cell.innerText = newValue
            }
        }
        product[header] = newValue
    }

    function createCell(field, productInfo) {
        const cell = document.createElement('td')
        cell.classList.add('table_contents')
        if (typeof (productInfo[field]) === 'boolean') {
            const img = document.createElement('img')
            productInfo[field] ? img.src = check : img.src = cross
            cell.appendChild(img)
        } else {
            cell.appendChild(document.createTextNode(productInfo[field]))
            if (field === 'Name') {
                if ('text' in productInfo) {
                    generateCellPopup(cell, productInfo)
                }
            }

        }
        return cell;
    }



    function createRow(fields, productInfo) {
        const row = document.createElement('tr')
        row.classList.add('table_contents')
        fields.map(field => {
            const cell = createCell(field, productInfo)
            row.appendChild(cell)
        })
        return row
    }

    function recursiveTree(info, nodeList) {
        nodeList.push(info)
        const value = document.createElement("p");
        value.appendChild(document.createTextNode(info.value))
        if ('color' in info) {
            value.style.backgroundColor = info.color
        }
        value.classList.add("item")
        if ('text' in info) {
            const text = document.createElement("span");
            text.appendChild(document.createTextNode(info.text))
            text.classList.add("itemtext")
            value.appendChild(text)
            value.addEventListener('mouseenter', displayItemInfo)
            value.addEventListener('mouseleave', displayItemInfo)
        }
        const node = document.createElement("li")
        node.appendChild(value)
        if (info.children.length === 0) {
            return node
        }
        const children = document.createElement("ul")
        info.children.map(child => {
            children.appendChild(recursiveTree(child, nodeList))
        })
        node.appendChild(children)

        return node

    }

    function displayItemInfo(e) {
        e.preventDefault()
        const popup = e.target.childNodes[1]
        popup.classList.toggle("display");
    }

    global.TreeGenerator = global.TreeGenerator || TreeGenerator
    global.PyramidGenerator = global.PyramidGenerator || PyramidGenerator
    global.VennDiagramGenerator = global.VennDiagramGenerator || VennDiagramGenerator
    global.PriceCardGenerator = global.PriceCardGenerator || PriceCardGenerator
    global.TableColumnGenerator = global.TableColumnGenerator || TableColumnGenerator
    global.TableRowGenerator = global.TableRowGenerator || TableRowGenerator
})(window, window.document);
