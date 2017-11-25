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
        // POST /vehicles/addnew
        [Route("vehicles/addnew")]
        [HttpPost]
        public Response AddVehicle(dynamic model)
        {
            Manager manager = new Manager();
            
            int PlateNumber = model.vehicle.PlateNumber;
            string PlateText = model.vehicle.PlateText;
            string PlateModel = model.vehicle.PlateModel;
            string PlateColor = model.vehicle.PlateText;
            int UserId = model.UserId;

            Response response = new Response();
            response = manager.AddNewVehicle(PlateNumber, PlateText, PlateModel, PlateColor, UserId);
            return response;
        }

        // POST /vehicles/addnew
        [Route("vehicles/getNewVehicles")]
        [HttpPost]
        public Response GetNewVehicles()
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.GetNewVehicles();
            return response;
        }

        // POST /vehicles/addnew
        [Route("vehicles/approve")]
        [HttpPost]
        public Response ApproveVehicle(int Id)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.ApproveVehicle(Id);
            return response;
        }

        // POST /vehicles/addnew
        [Route("vehicles/reject")]
        [HttpDelete]
        public Response RejectVehicle(int Id)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.RejectVehicle(Id);
            return response;
        }
    }
}