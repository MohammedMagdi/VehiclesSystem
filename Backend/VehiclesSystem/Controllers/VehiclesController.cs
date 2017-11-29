using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VehiclesSystem.BusinessManager;
using VehiclesSystem.Models;

namespace VehiclesSystem.Controllers
{
    public class VehiclesController : ApiController
    {
        #region POST /vehicles/addnew
        [Route("vehicles/addnew")]
        [HttpPost]
        public Response AddVehicle(Response model)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.AddNewVehicle(model.Vehicles[0].PlateNumber
                , model.Vehicles[0].PlateText
                , model.Vehicles[0].PlateModel
                , model.Vehicles[0].PlateColor
                , model.UserId);
            return response;
        }
        #endregion


        #region  POST /vehicles/getNewVehicles
        [Route("vehicles/getNewVehicles")]
        [HttpPost]
        public Response GetNewVehicles()
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.GetNewVehicles();
            return response;
        }
        #endregion


        #region POST /vehicles/approve
        [Route("vehicles/approve")]
        [HttpPost]
        public Response ApproveVehicle(Response model)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.ApproveVehicle(model.VehicleId);
            return response;
        }
        #endregion


        #region POST /vehicles/reject
        [Route("vehicles/reject")]
        [HttpPost]
        public Response RejectVehicle(Response model)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.RejectVehicle(model.VehicleId);
            return response;
        }
        #endregion
    }
}