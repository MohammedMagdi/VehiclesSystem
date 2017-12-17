class StringsModel {
    constructor() {
        this.HomeUrl = '/';
        this.LoginUrl = '/login';
        this.RegisterUrl = '/register';
        this.AdminUrl = '/admin';

        this.BaseUrl = 'http://localhost:49949';

        this.AddNewVehicleAPi = '/vehicles/addnew';
        this.getNewVehiclesAPI = '/vehicles/getNewVehicles';
        this.approveVehicleAPI = '/vehicles/approve';
        this.regictVehicleAPI = '/vehicles/reject';
        this.registerUserAPI = '/users/register';
        this.loginUserAPI = '/users/login';

        this.POST = 'POST';
        this.GET = 'GET';

        this.UserId = 'Vehicles_System_UserID';
    }
}
export default (new StringsModel());