import BaseFormPresenter from "../../base/BaseFormPresenter";

class PaymentFormPresenter extends BaseFormPresenter {
  componentDidMount() {
    this.init();
    this.getObject();
    this.getPaymentMethod();
  }

  init() {
    this.object = {};
    this.change = {}; // when data is change
    this.limit = 10;
    this.current = 1;
    this.where = {};
    this.objects = [];
    this.sort = { createdAt: -1 };
  }
  onChange(value, field) {
    this.change[field] = value;
  }

  onChange1(value, field) {
    this.change[field] = value;

    const payment = this.change[field];

    const method = this.view.getPaymentMethod();

    const paymentMethod = method.map((m) => m.name.includes(payment["name"]));

    if (paymentMethod) {
      this.view.showDescription(payment);
    }
  }

  async getPaymentMethod() {
    const collection = "payment_methods";
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      where: this.where,
      include: ["all"],
      sort: this.sort,
    };
    this.view.showProgress();
    try {
      const { count, objects } = await this.findObjectUseCase.execute(
        collection,
        query
      );
      this.objects = this.objects.concat(objects);

      console.log("hahaha", this.objects);
      this.view.setPaymentMethod(this.objects);
      this.view.hideProgress();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
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
        resident2: user.first_name,
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
