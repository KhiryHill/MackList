import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import Form from "../components/AddItemForm";
import API from "../utils/API"
import { AdCard1 } from "../components/ad/index";
import { Input, TextArea, FormBtn } from "../components/input";

class UserPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
            allposts: [],
            message: "",
            onepost: [],
            productTitle: "",
            productDescription: "",
            productCost: "",
            productImage: "",
            sellerContactName: "",
            sellerContactPhone: "",
            sellerContactEmail: "",

        };
        //  this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    componentDidMount = () => {
        API.getAd({})
            .then(results => {
                this.setState({ allposts: results.data })
                // console.log(results)
                // console.log(this.state.allposts)
            })
            .catch(err => console.log(err))
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value, placeholder } = event.target;
        if (value === "") {
            this.setState({
                [name]: placeholder
            })
        } else {
            this.setState({
                [name]: value
            });
        }
    };

    handleFormSubmit = (id) => {
        API.updateAd({
            id,
            productTitle: this.state.productTitle,
            productDescription: this.state.productDescription,
            productCost: this.state.productCost
        }).then(results => {
            this.setState({ message: "Posting updated" })
        })
            .catch(err => console.log(err))

    }
    // handleUploadImage(ev) {
    //     ev.preventDefault();
    //     const data = new FormData();
    //     data.append('file', this.uploadInput.files[0]);
    //     data.append('filename', this.fileName.value);
    //     fetch('http://localhost:3000/', {
    //         method: 'POST',
    //         body: data,
    //     }).then((response) => {
    //         response.json().then((body) => {
    //             this.setState({ imageURL: `http://localhost:8000/${body.file}` });
    //         });
    //     });
    // }
    // ImageSelectHandler = event => {
    //     console.log(event)
    // }

    clicked = (id) => {
        API.getAdById({ id })
            .then(results => {
                console.log(results)
                this.setState({ onepost: results.data })
            })
            .catch(err => console.log(err))
    }

    deleteAd = (id) => {
        console.log(id)
        API.deletebyID({ id })
            .then(results => {
                console.log(results)
                this.setState({ message: "Posting removed" })
            })
            .catch(err => console.log(err))
    }

    render() {
        const loggedIn = this.props.loggedIn;
        const user = this.props.user;
        return (
            <Wrapper>
                <div>
                    {loggedIn ?
                        <div>
                            <div className="text-center">
                                <h1 >Welcome {user}!</h1>
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">
                                    Create Post</button></div>
                            <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Ad Form</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <Form user={user} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br /><h3 className="text-center">My Posts</h3>
                            <h4>{this.state.message}</h4>
                        </div>
                        : <h1 className="text-center">Please LogIn to use this page!</h1>}
                </div>
                <div>
                    {this.state.allposts.map(ele => {
                        if (user === ele.owner) {
                            console.log("../uploads/" + ele.productImage)
                            return <AdCard1
                                name={ele.productTitle}
                                price={" $" + ele.productCost}
                                // image={require("../uploads/" + ele.productImage)}
                                image={ele.productImage}
                            >
                                <button onClick={e => this.clicked(ele._id)} data-toggle="modal"
                                    data-target="#editModal" className="btn btn-danger">Edit</button>
                                <br /><button onClick={e => this.clicked(ele._id)} data-toggle="modal"
                                    data-target="#deleteModal" className="btn btn-danger">Delete</button>
                            </AdCard1>
                        }
                    })}
                </div>
                <div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                Edit Post
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {this.state.onepost.map(ele => {
                                    return (
                                        <div>
                                            <div className="text-center" >
                                                <img src={ele.productImage} alt={ele.productTitle} height="250px" width="350px" /></div>
                                            <form onSubmit={e => this.handleFormSubmit(ele._id)}>
                                                <p><b>Title:</b><Input type="text" name="productTitle" value={this.state.productTitle} placeholder={ele.productTitle} onChange={this.handleInputChange} /></p>
                                                <p><b>Image:</b><Input type="text" name="productImage" value={this.state.productImage} placeholder={ele.productImage} onChange={this.handleInputChange} /></p>
                                                <p><b>Description:</b><TextArea type="text" name="productDescription" value={this.state.productDescription} placeholder={ele.productDescription} onChange={this.handleInputChange} /></p>
                                                <p><b>Cost:</b><Input type="text" pattern="[0-9]{1,}" name="productCost" value={this.state.productCost} placeholder={ele.productCost} onChange={this.handleInputChange} /></p>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                Delete Post
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {this.state.onepost.map(ele => {
                                    return (
                                        <div>
                                            <p>Are you sure you want to delete {ele.productTitle}?</p>
                                            <button type="button" onClick={e => this.deleteAd(ele._id)} className="btn btn-success" data-toggle="modal" data-target="#deleteModal">
                                                Yes</button>
                                            <button type="button" className="btn btn-danger ml-2" data-dismiss="modal" aria-label="Close">
                                                No</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </Wrapper>
        )
    }
}

export default UserPost;
