import BaseFormPresenter from "../../base/BaseFormPresenter";

class PaymentFormPresenter extends BaseFormPresenter {
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
            await this.upsertUseCase.execute(collection, {
                ...this.change,
                member: {id: user.profile.id},
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
        } catch (error) {
            this.view.submissionError(error);
            this.view.showError(error);
        }
    }
}

export default PaymentFormPresenter;
