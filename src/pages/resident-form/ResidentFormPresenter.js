import BaseFormPresenter from "../../base/BaseFormPresenter";

class ResidentFormPresenter extends BaseFormPresenter {
  async save() {
    const collection = this.view.getCollectionName();
    const object = this.view.getObject();
    const user = this.view.getCurrentUser();
    if (object.id) {
      this.change.id = object.id;
    } else {
      this.change.acl = this.view.getAcl();
    }
    try {
      const profile = await this.upsertUseCase.execute(collection, this.change);
      await this.upsertUseCase.execute("users", {
        id: user.id,
        profile: { id: profile.id },
      });
    } catch (error) {
      throw error; // rethrow the error to be caught by the caller
    }
  }

  async getObject() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const id = user.profile.id;
    if (id) {
      const params = { include: ["all"] };
      try {
        this.view.showProgress();
        const object = await this.getObjectUseCase.execute(collection, id, {
          params,
        });
        this.view.hideProgress();
        this.view.setObject(object);
      } catch (error) {
        this.view.hideProgress();
        this.view.showError(error);
      }
    }
  }

  async submit() {
    if (Object.values(this.change).length === 0) {
      // this.view.navigateBack();
      this.view.showSuccess("Successfully saved!");
      console.log("object dito na values daw");
      return;
    }
    try {
      this.view.submitting();
      await this.save();
      this.view.submissionSuccess();
      this.view.showSuccess("Successfully saved!");
      // this.view.navigateBack();
      console.log("success dito yung submit");
    } catch (error) {
      this.view.submissionError(error);
      this.view.showError(error);
    }
  }
}

export default ResidentFormPresenter;
