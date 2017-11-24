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
    public class UserController : ApiController
    {
        // POST api/<controller> add new user
        [HttpPost]
        public Response AddUser(string firstName , string lastName , string email , byte age , string mobileNumber )
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.CreateUser( firstName, lastName, email, age, mobileNumber);
            return response;
        }

        // POST api/<controller> get all users
        [HttpPost]
        public Response GetAllUsers()
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.GetUsers();
            return response;
        }


    }
}