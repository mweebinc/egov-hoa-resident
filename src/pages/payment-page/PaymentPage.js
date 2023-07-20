import React, { Component } from "react";
import NavBar from "../../components/navbar";
import { Button, Table } from "nq-component";
import BaseListPage from "../../base/BaseListPage";
import PaymentPagePresenter from "./PaymentPagePresenter";
import { findObjectUseCase } from "../../usecases/object";

class PaymentPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new PaymentPagePresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "payments";
  }
  render() {
    const objects = this.state.objects;
    const schema = this.getSchema(this.getCollectionName());
    console.log("get fields", objects);
    const label = "Payment History";
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="h-100">
            <div className="p-3 p-lg-4">
              <h1 className="fw-bold mt-3 text-capitalize">{label}</h1>
              <Table
                fields={schema.fields}
                excludeFields={[
                  "resident",
                  "acl",
                  "id",
                  "createdAt",
                  "updatedAt",
                  "createdBy",
                ]}
                objects={objects}
                collapse={false}
                className="mt-4"
              />
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="shadow-sm bg-primary"
            onClick={this.onClickAdd.bind(this)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              color: "white",
            }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div>
      </>
    );
  }
}

export default PaymentPage;
