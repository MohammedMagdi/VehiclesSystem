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
        // POST api/<controller> add new vehicle
        [HttpPost]
        public Response AddVehicle(int PlateNumber, string PlateText, string PlateModel, string PlateColor, int UserId)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.AddNewVehicle(PlateNumber, PlateText, PlateModel, PlateColor, UserId);
            return response;
        }

        // POST api/<controller> get all Vehicles
        [HttpPost]
        public Response GetNewVehicles()
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.GetNewVehicles();
            return response;
        }

        // POST api/<controller> Approve Vehicle
        [HttpPost]
        public Response ApproveVehicle(int Id)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.ApproveVehicle(Id);
            return response;
        }

        // DELET api/<controller> reject Vehicle
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