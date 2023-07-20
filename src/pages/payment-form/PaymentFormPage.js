import React from "react";
import PaymentFormPresenter from "./PaymentFormPresenter";
import { getObjectUseCase, upsertUseCase } from "../../usecases/object";
import withRouter from "../../withRouter";
import BaseFormPage from "../../base/BaseFormPage";
import NavBar from "../../components/navbar";
import FormFactory from "../../components/FormFactory";

class ResidentFormPage extends BaseFormPage {
  constructor(props) {
    super(props);
    this.state = { object: {}, description: {} };
    this.presenter = new PaymentFormPresenter(
      this,
      getObjectUseCase(),
      upsertUseCase()
    );
  }

  showDescription(description) {
    this.setState({ description });
  }

  getCollectionName() {
    return "payments";
  }
  showSuccessSnackbar(message) {
    this.showSuccess(message);
  }

  render() {
    const object = this.state.object;
    const description = this.state.description;
    const schema = this.getSchema(this.getCollectionName());
    console.log("desc", description);

    if (!schema) return <h1>no schema</h1>;
    // const label = this.getObjectId() === undefined ? "Add New " : "Edit ";

    const label = "Make Payment";
    return (
      <>
        <NavBar />
        <div className="overflow-auto">
          <div className="h-100">
            <div className="p-3 p-lg-4">
              <h1 className="fw-bold mt-3 text-capitalize">
                {/* {label + (schema.label || this.getCollectionName())} */}
                {label}
              </h1>
              <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                <form onSubmit={this.onSubmitForm.bind(this)}>
                  <div className="row g-3">
                    <FormFactory
                      excludeFields={[
                        "status",
                        "resident",
                        "receipt",
                        "amount",
                        "date",
                        "description",
                        "createdBy",
                        "resident2",
                      ]}
                      schema={schema}
                      object={object}
                      onChange={this.onChange.bind(this)}
                    />
                  </div>
                </form>
                {description["description"] ? (
                  <div class="card mt-2">
                    <div class="card-body">{description.description}</div>
                  </div>
                ) : null}
              </div>
              <div className="mt-3 bg-white shadow rounded p-3 px-lg-5 py-lg-4">
                <form onSubmit={this.onSubmitForm.bind(this)}>
                  <div className="row g-3">
                    <FormFactory
                      excludeFields={[
                        "status",
                        "resident",
                        "method",
                        "description",
                        "createdBy",
                        "resident2",
                      ]}
                      schema={schema}
                      object={object}
                      onChange={this.onChange.bind(this)}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary fs-sm me-3"
                    >
                      <i className="bi bi-file-earmark-check me-2"></i>SAVE
                    </button>
                    <button
                      type="button"
                      className="btn btn-light fs-sm"
                      onClick={this.onClickBack.bind(this)}
                    >
                      GO BACK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ResidentFormPage);
