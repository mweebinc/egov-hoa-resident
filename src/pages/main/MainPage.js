import React from "react";
import MainPagePresenter from "./MainPagePresenter";
import { Menu } from "nq-component";
import { getAllSchemasUseCase } from "../../usecases/schema/usecases";
import { getCurrentUserUseCase, signOutUseCase } from "../../usecases/user";
import { Routes, Route } from "react-router-dom";
import { OffCanvas } from "nq-component";
import CollectionListPage from "../collection-list/CollectionListPage";
import CollectionFormPage from "../collection-form/CollectionFormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import { Layout, Progress, LogoHolder } from "nq-component";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RoleFormPage from "../role-form/RoleFormPage";
import withRouter from "../../withRouter";
import DashboardPage from "../dashboard/DashboardPage";
import ResidentFormPage from "../resident-form/ResidentFormPage";
import PaymentFormPage from "../payment-form/PaymentFormPage";
import PaymentPage from "../payment-page/PaymentPage";

class MainPage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new MainPagePresenter(
      this,
      getCurrentUserUseCase(),
      signOutUseCase(),
      getAllSchemasUseCase()
    );
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  onClickSignOut() {
    this.presenter.onClickSignOut();
  }

  onClickMenu(e, item) {
    e.preventDefault();
    this.navigateTo(item.route);
  }

  render() {
    const user = this.getCurrentUser();
    const schemas = this.getSchemas();
    // const roles = this.getCurrentRoles();
    if (user === undefined || schemas === undefined) {
      return <Progress />;
    }
    const menus = [
      {
        name: "Payment",
        // route: "/payment",
        route: "/payment-page",
        icon: "bi bi-wallet",
      },
      {
        name: "Form",
        route: "/form",
      },
      {
        name: "Account",
        route: "/account",
        icon: "bi bi-sliders",
      },
    ];
    return (
      <Layout>
        <Layout.Context.Consumer>
          {(value) => (
            <OffCanvas onSetShow={value.setCollapse} show={value.collapsed}>
              <div className="offcanvas-body">
                <nav className="navbar-dark">
                  <div className="text-center">
                    <LogoHolder
                      className="bg-white"
                      textClassName="text-dark"
                      logo={user.picture}
                      name={user.username}
                    />
                    <p className="text-white mt-3">
                      {user.name || user.username}
                    </p>
                  </div>
                  <hr className="dropdown-divider bg-light" />
                  <Menu
                    onClickItem={this.onClickMenu.bind(this)}
                    menus={menus}
                  />
                </nav>
              </div>
              <div className="m-3">
                <button
                  className="nav-link text-white btn btn-link"
                  onClick={this.onClickSignOut.bind(this)}
                >
                  <i className="bi bi-power"></i>
                  <span className="ms-2 fw-bold small">Log out</span>
                </button>
              </div>
            </OffCanvas>
          )}
        </Layout.Context.Consumer>
        <main className="vh-100 d-flex flex-column">
          <Routes>
            <Route exact path={"/"} element={<ResidentFormPage />} />
            <Route
              exact
              path={"/collection/dashboard"}
              element={<DashboardPage />}
            />
            <Route
              exact
              path={"/collection/:name"}
              element={<CollectionListPage />}
            />
            <Route path={"/collection/roles/form"} element={<RoleFormPage />} />
            <Route
              path={"/collection/roles/form/:id"}
              element={<RoleFormPage />}
            />
            <Route
              path={"/collection/:name/form/"}
              element={<CollectionFormPage />}
            />
            <Route
              path={"/collection/:name/form/:id"}
              element={<CollectionFormPage />}
            />
            <Route path={"/migration"} element={<MigrationPage />} />
            <Route path={"/form"} element={<ResidentFormPage />} />
            <Route path={"/payment"} element={<PaymentFormPage />} />
            <Route path={"/account"} element={<AccountPage />} />
            <Route path={"/payment-page"} element={<PaymentPage />} />

            <Route element={<NotFoundPage />} />
          </Routes>
        </main>
      </Layout>
    );
  }
}

export default withRouter(MainPage);
