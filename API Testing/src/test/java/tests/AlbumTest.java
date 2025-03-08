package tests;

import models.Albums;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.List;

public class AlbumTest {

    @Test
    public void testGetAlbums() {
        // Base URI
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com";

        // Send GET request (headers removed)
        Response response = RestAssured.given()
                .when()
                .get("/albums")
                .then()
                .extract()
                .response();

        // Validate status code
        Assert.assertEquals(response.getStatusCode(), 200, "Status code is not 200");

        // Deserialize response
        List<Albums> albums = response.jsonPath().getList("", Albums.class);
        
        // Verify complete dataset structure
        Assert.assertEquals(albums.size(), 100, "Expected 100 albums");
        
        // Test album sequence pattern
        for(int i = 0; i < albums.size(); i++) {
            Albums album = albums.get(i);
            int expectedUserId = (i / 10) + 1;  // User IDs increment every 10 albums
            int expectedAlbumId = i + 1;         // Album IDs are sequential
            
            Assert.assertEquals(album.getUserId(), expectedUserId, 
                "User ID mismatch at index " + i);
            Assert.assertEquals(album.getId(), expectedAlbumId, 
                "Album ID mismatch at index " + i);
        }

        // Verify specific known entries
        Albums firstAlbum = albums.get(0);
        Assert.assertEquals(firstAlbum.getTitle(), "quidem molestiae enim", 
            "First album title mismatch");
            
        Albums fiftiethAlbum = albums.get(49);
        Assert.assertEquals(fiftiethAlbum.getUserId(), 5, 
            "Album 50 should belong to user 5");
        Assert.assertEquals(fiftiethAlbum.getTitle(), "sed qui sed quas sit ducimus dolor", 
            "Album 50 title mismatch");
    }
}