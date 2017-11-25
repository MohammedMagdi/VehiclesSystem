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
        // POST /users/register
        [Route("users/register")]
        [HttpPost]
        public Response AddUser(User user)
        {
            Manager manager = new Manager();

            Response response = new Response();
            response = manager.CreateUser( user.FirstName, user.LastName,user.Email, user.Age, user.MobileNumber);
            return response;
        }

        // POST /users
        [Route("users")]
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