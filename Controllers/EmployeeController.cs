using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EmployeeController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public EmployeeController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }
    //GET all employees
    [HttpGet]
    [Authorize]
    public IActionResult GetAllEmployees()
    {
        return Ok(_dbContext.Employees.ToList());
    }





}


