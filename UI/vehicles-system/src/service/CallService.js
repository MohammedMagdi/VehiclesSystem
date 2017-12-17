import $ from "jquery";
import StringsModel from '../resources/StringsModel';

const CallService = (URL, Type, Model, CallbackSuccess, CallbackError, VehicleIndex) => {
    $.ajax({
        url: StringsModel.BaseUrl + URL,
        type: Type,
        dataType: 'json',
        data: Model,
        success: function (data, textStatus, xhr) {
            CallbackSuccess(data, VehicleIndex);
        },
        error: function (xhr, textStatus, errorThrown) {
            CallbackError();
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }

    });
}
export default CallService;
