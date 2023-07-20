import BaseListPresenter from "../../base/BaseListPresenter";

class PaymentPagePresenter extends BaseListPresenter {
  onClickAdd() {
    const collection = this.view.getCollectionName();
    this.view.navigateTo("/payment");
  }

  async getObjects() {
    const collection = this.view.getCollectionName();
    const user = this.view.getCurrentUser();
    const skip = (this.current - 1) * this.limit;
    const query = {
      count: true,
      limit: this.limit,
      skip: skip,
      // where: this.where,
      where: {
        ...this.where,
        createdBy: user.id,
      },
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
      this.view.setCount(count);
      this.view.setObjects(this.objects);
      this.view.hideProgress();
    } catch (error) {
      this.view.hideProgress();
      this.view.showError(error);
    }
  }
}

export default PaymentPagePresenter;
