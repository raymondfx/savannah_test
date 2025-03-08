package tests;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.Test;
import org.testng.Assert;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class PhotosTest {

    public static class Photo {
        private int albumId;
        private int id;
        private String title;
        private String url;
        private String thumbnailUrl;

        // Getters
        public int getAlbumId() { return albumId; }
        public int getId() { return id; }
        public String getTitle() { return title; }
        public String getUrl() { return url; }
        public String getThumbnailUrl() { return thumbnailUrl; }
    }

    @Test
    public void verifyPhotosEndpoint() {
        RestAssured.baseURI = "https://jsonplaceholder.typicode.com";
        
        Response response = given()
            .when()
            .get("/photos");

        // Validate basic response properties
        response.then()
            .statusCode(200)
            .contentType("application/json")
            .body("$", instanceOf(List.class));

        List<Photo> photos = response.jsonPath().getList(".", Photo.class);
        
        // Verify at least 12 photos returned
        Assert.assertTrue(photos.size() >= 12);
        
        // Validate photo structure
        photos.forEach(photo -> {
            Assert.assertTrue(photo.getId() > 0);
            Assert.assertTrue(photo.getAlbumId() > 0);
            Assert.assertNotNull(photo.getTitle());
            Assert.assertTrue(photo.getUrl().startsWith("https://via.placeholder.com/600/"));
            Assert.assertTrue(photo.getThumbnailUrl().startsWith("https://via.placeholder.com/150/"));
        });

        // Verify unique IDs
        Set<Integer> uniqueIds = photos.stream()
            .map(Photo::getId)
            .collect(Collectors.toSet());
        Assert.assertEquals(uniqueIds.size(), photos.size());

        // Validate first photo data
        Photo firstPhoto = photos.get(0);
        Assert.assertEquals(firstPhoto.getAlbumId(), 1);
        Assert.assertEquals(firstPhoto.getId(), 1);
        Assert.assertEquals(firstPhoto.getTitle(), "accusamus beatae ad facilis cum similique qui sunt");
        Assert.assertEquals(firstPhoto.getUrl(), "https://via.placeholder.com/600/92c952");
        Assert.assertEquals(firstPhoto.getThumbnailUrl(), "https://via.placeholder.com/150/92c952");
    }

    @Test
    public void testPhotoPagination() {
        Response response = given()
            .queryParam("_page", 1)
            .queryParam("_limit", 5)
            .when()
            .get("/photos");

        response.then()
            .statusCode(200)
            .body("size()", equalTo(5));
    }

    @Test
    public void testFilterByAlbumId() {
        Response response = given()
            .queryParam("albumId", 1)
            .when()
            .get("/photos");

        List<Photo> photos = response.jsonPath().getList(".", Photo.class);
        photos.forEach(photo -> 
            Assert.assertEquals(photo.getAlbumId(), 1)
        );
    }
}