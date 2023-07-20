import BaseFormPresenter from "../../base/BaseFormPresenter";

class PaymentFormPresenter extends BaseFormPresenter {
  onChange(value, field) {
    this.change[field] = value;

    const payment = this.change[field];

    if (payment["name"] === "Gcash") {
      this.view.showDescription(payment);
    } else if (payment["name"] === "WALK IN") {
      this.view.showDescription(payment);
    }
  }
  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser();
    if (object.id) {
      this.change.id = object.id;
    } else {
      this.change.acl = this.view.getAcl();
      console.log("value2: ", this.change.acl);
    }

    try {
      await this.upsertUseCase.execute(collection, {
        ...this.change,
        createdBy: user.id,
        status: "PENDING",
        // member: {id: user.profile.id},
      });
    } catch (error) {
      throw error; // rethrow the error to be caught by the caller
    }
  }
  async submit() {
    try {
      this.view.submitting();
      await this.save();
      this.view.submissionSuccess();
      this.view.showSuccessSnackbar("Successfully saved!");
      this.view.navigateBack();
    } catch (error) {
      this.view.submissionError(error);
      this.view.showError(error);
    }
  }
}

export default PaymentFormPresenter;
