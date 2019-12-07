import React, { Component } from "react";
import Axios from "axios";
import ShowAds from "./ShowAds"



class Sidebar extends Component {
    lowTohigh = () => {
        Axios.get("/api/ads/lowTohigh")
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-3">
                    <nav className="nav flex-column bg-dark">
                        <a className="nav-link active" href="#collapseExample">Deparments</a>
                        <a className="btn btn-primary" data-toggle="collapse" href="#cars" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Cars </a>
                        <div className="collapse" id="cars">
                            <div className="card card-body">
                                <div class="form-check">
                                    <input  class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"  onClick={this.lowTohigh}></input>
                                    <label class="form-check-label" for="exampleRadios1">
                                        <a className="text-primary" href="#lowPrice">lowTohigh</a>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
                                    <label class="form-check-label" for="exampleRadios2">
                                        <a className="text-primary" href="#highPrice">highPrice</a>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <a className="nav-link" href="#">Deparments</a>
                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Category </a>
                        <div className="collapse" id="collapseExample2">
                            <div className="card card-body">
                                links of categories
                                </div>
                        </div>
                        <a className="nav-link" href="#">Deparments</a>
                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Category </a>
                        <div className="collapse" id="collapseExample3">
                            <div className="card card-body">
                                links of categories
                                </div>
                        </div>
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Deparments</a>
                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Category </a>
                        <div className="collapse" id="collapseExample4">
                            <div className="card card-body">
                                links of categories
                                </div>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <ShowAds />
                </div>
            </div>
        )
    }
}

export default Sidebar