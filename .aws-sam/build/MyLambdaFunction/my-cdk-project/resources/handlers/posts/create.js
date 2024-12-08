"use strict";
// ./resources/handlers/posts/create.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const crypto_1 = require("crypto");
const dynamodb = new client_dynamodb_1.DynamoDB({});
async function create(body) {
    const uuid = (0, crypto_1.randomUUID)();
    // If no body, return an error
    if (!body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing body' }),
        };
    }
    // Parse the body
    const bodyParsed = JSON.parse(body);
    // Creat the post
    await dynamodb.send(new lib_dynamodb_1.PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            pk: `POST#${uuid}`,
            ...bodyParsed,
        },
    }));
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Post created' }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBdUM7O0FBU3ZDLHdCQTZCQztBQXBDRCw4REFBb0Q7QUFDcEQsd0RBQW1EO0FBQ25ELG1DQUFvQztBQUdwQyxNQUFNLFFBQVEsR0FBRyxJQUFJLDBCQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFM0IsS0FBSyxVQUFVLE1BQU0sQ0FBQyxJQUFtQjtJQUM5QyxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFVLEdBQUUsQ0FBQztJQUUxQiw4QkFBOEI7SUFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7U0FDbEQsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVUsQ0FBQztJQUU3QyxpQkFBaUI7SUFDakIsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUNqQixJQUFJLHlCQUFVLENBQUM7UUFDYixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO1FBQ2pDLElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRTtZQUNsQixHQUFHLFVBQVU7U0FDZDtLQUNGLENBQUMsQ0FDSCxDQUFDO0lBRUYsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7S0FDbEQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuL3Jlc291cmNlcy9oYW5kbGVycy9wb3N0cy9jcmVhdGUudHNcclxuXHJcbmltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWR5bmFtb2RiJztcclxuaW1wb3J0IHsgUHV0Q29tbWFuZCB9IGZyb20gJ0Bhd3Mtc2RrL2xpYi1keW5hbW9kYic7XHJcbmltcG9ydCB7IHJhbmRvbVVVSUQgfSBmcm9tICdjcnlwdG8nO1xyXG5pbXBvcnQgeyBJUG9zdCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcclxuXHJcbmNvbnN0IGR5bmFtb2RiID0gbmV3IER5bmFtb0RCKHt9KTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGUoYm9keTogc3RyaW5nIHwgbnVsbCkge1xyXG4gIGNvbnN0IHV1aWQgPSByYW5kb21VVUlEKCk7XHJcblxyXG4gIC8vIElmIG5vIGJvZHksIHJldHVybiBhbiBlcnJvclxyXG4gIGlmICghYm9keSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdNaXNzaW5nIGJvZHknIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFBhcnNlIHRoZSBib2R5XHJcbiAgY29uc3QgYm9keVBhcnNlZCA9IEpTT04ucGFyc2UoYm9keSkgYXMgSVBvc3Q7XHJcblxyXG4gIC8vIENyZWF0IHRoZSBwb3N0XHJcbiAgYXdhaXQgZHluYW1vZGIuc2VuZChcclxuICAgIG5ldyBQdXRDb21tYW5kKHtcclxuICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UQUJMRV9OQU1FLFxyXG4gICAgICBJdGVtOiB7XHJcbiAgICAgICAgcGs6IGBQT1NUIyR7dXVpZH1gLFxyXG4gICAgICAgIC4uLmJvZHlQYXJzZWQsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdQb3N0IGNyZWF0ZWQnIH0pLFxyXG4gIH07XHJcbn0iXX0=