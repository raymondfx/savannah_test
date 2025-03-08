package tests;

import models.Users;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.List;

public class UsersTest {

    @Test
    public void testGetUsers() {
        // Base URI configuration
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com";

        // Actual API request without mocking
        Response response = RestAssured.given()
                .when()
                .get("/users")
                .then()
                .extract()
                .response();

        // Validate response status code
        Assert.assertEquals(response.getStatusCode(), 200, "Status code is not 200");

        // Deserialize and verify response data
        List<Users> users = response.jsonPath().getList("", Users.class);
        Assert.assertEquals(users.size(), 10, "Expected 10 users in response");
        
        // First user validation
        Users firstUser = users.get(0);
        Assert.assertEquals(firstUser.getId(), 1, "First user ID mismatch");
        Assert.assertEquals(firstUser.getName(), "Leanne Graham", "Name mismatch");
        Assert.assertEquals(firstUser.getUsername(), "Bret", "Username mismatch");
        Assert.assertEquals(firstUser.getEmail(), "Sincere@april.biz", "Email mismatch");
        
        // Address validation
        Assert.assertEquals(firstUser.getAddress().get("street"), "Kulas Light", "Street mismatch");
        Assert.assertEquals(firstUser.getAddress().get("suite"), "Apt. 556", "Suite mismatch");
        
        // Company validation
        Assert.assertEquals(firstUser.getCompany().get("name"), "Romaguera-Crona", "Company name mismatch");
    }
}