import { BrowserRouter } from "react-router-dom";
import Table from "./Table";
import{ render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
    

describe('testing table component',()=>{

    const closefunction=jest.fn()

    test('checking that the table component is rendered properly',()=>{
        const fields = [
            {
                index: 1,
                title: "Sr. No.",
              },
              {
                index: 2,
                title: "Category",
              },
              {
                index: 4,
                title: "Actions",
              },
        ]
        const entries = [
                {
                    "id": 255,
                    "name": "Astrology"
                },
                {
                    "id": 254,
                    "name": "Lunar Space"
                },
                {
                    "id": 253,
                    "name": "Fabrication"
                },
                {
                    "id": 252,
                    "name": "Craft"
                },
                {
                    "id": 250,
                    "name": "Watch Making"
                },
                {
                    "id": 228,
                    "name": "Aadhar"
                },
                {
                    "id": 227,
                    "name": "Epic Fantasy"
                },
                {
                    "id": 226,
                    "name": "Historical Fiction"
                },
                {
                    "id": 224,
                    "name": "Magical Realism"
                },
                {
                    "id": 223,
                    "name": "Dystopian"
                }
            ]
        render(
        <BrowserRouter>
        <Provider store={store}>
        < Table onEditClick={jest.fn()}
            fields = {fields}
            entries = {entries}
            type = 'category'
            onDeleteClick={jest.fn()}
            onAssignClick={jest.fn()}
            pageNumber = {0}
            pageSize = {10}
            />
            </Provider>
            </BrowserRouter>
            )
    })
    test('checking that the table component is rendered properly',()=>{
        const entries =[
            {
                "id": 94,
                "title": "Abhay Raj",
                "author": "Abhay raj",
                "image": "",
                "quantity": 1,
                "currQty": 1,
                "categoryName": "Dystopian"
            },
            {
                "id": 92,
                "title": "Zero Stars",
                "author": "MJ William",
                "image": "https://m.media-amazon.com/images/I/51Xkqi+D2DL._SY445_SX342_.jpg",
                "quantity": 4,
                "currQty": 2,
                "categoryName": "Comics"
            },
            {
                "id": 91,
                "title": "In Five Years",
                "author": "Rebecca",
                "image": "https://m.media-amazon.com/images/I/41DZJJh4NlL._SY445_SX342_.jpg",
                "quantity": 5,
                "currQty": 4,
                "categoryName": "Craft"
            },
            {
                "id": 90,
                "title": "Then She Was Gone",
                "author": "Lisa Jewel",
                "image": "https://m.media-amazon.com/images/I/51TgUSSJBJL._SY445_SX342_.jpg",
                "quantity": 5,
                "currQty": 4,
                "categoryName": "Crime"
            },
            {
                "id": 89,
                "title": "The Body In The Backyard",
                "author": "Lucy Score",
                "image": "https://m.media-amazon.com/images/I/713tjLN4itL._SY466_.jpg",
                "quantity": 1,
                "currQty": 0,
                "categoryName": "Business"
            },
            {
                "id": 88,
                "title": "Things we never got over",
                "author": "Lucy Score",
                "image": "https://m.media-amazon.com/images/I/41qiZpKBDvL._SY445_SX342_.jpg",
                "quantity": 5,
                "currQty": 4,
                "categoryName": "Cyberpunk"
            },
            {
                "id": 87,
                "title": "spiderman",
                "author": "spiderman",
                "image": "https://m.media-amazon.com/images/I/81fMKDnzAQL._SY466_.jpg",
                "quantity": 3,
                "currQty": 1,
                "categoryName": "Lunar Space"
            },
            {
                "id": 86,
                "title": "Beautiful Country",
                "author": "Beautiful Country",
                "image": "https://m.media-amazon.com/images/I/81fMKDnzAQL._SY466_.jpg",
                "quantity": 5,
                "currQty": 3,
                "categoryName": "Art"
            },
            {
                "id": 85,
                "title": "alpha",
                "author": "alpha",
                "image": null,
                "quantity": 1,
                "currQty": 0,
                "categoryName": "Drama"
            },
            {
                "id": 81,
                "title": "Maths",
                "author": "Aditya Agrawal",
                "image": null,
                "quantity": 90,
                "currQty": 89,
                "categoryName": "Aadhar"
            }
        ]

        const fields=[
            {
                "index": 1,
                "title": "Sr. No."
            },
            {
                "index": 2,
                "title": "Title"
            },
            {
                "index": 3,
                "title": "Author"
            },
            {
                "index": 5,
                "title": "Total Quantity"
            },
            {
                "index": 6,
                "title": "Available Quantity"
            },
            {
                "index": 7,
                "title": "Actions"
            },
            {
                "index": 8,
                "title": "Issuances"
            }
        ]
        render(
        <BrowserRouter>
        <Provider store={store}>
        < Table onEditClick={jest.fn()}
            fields = {fields}
            entries = {entries}
            type = 'book'
            onDeleteClick={jest.fn()}
            onAssignClick={jest.fn()}
            pageNumber = {0}
            pageSize = {10}
            />
            </Provider>
            </BrowserRouter>
            )
    })
    
})
