"use strict";
// ./resources/handlers/posts/delete.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = deletePost;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb = new client_dynamodb_1.DynamoDB({});
async function deletePost({ id }) {
    await dynamodb.send(new lib_dynamodb_1.DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            pk: `POST#${id}`,
        },
    }));
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Post deleted' }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBdUM7O0FBT3ZDLGdDQWNDO0FBbkJELDhEQUFvRDtBQUNwRCx3REFBc0Q7QUFFdEQsTUFBTSxRQUFRLEdBQUcsSUFBSSwwQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTNCLEtBQUssVUFBVSxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQWtCO0lBQ3JELE1BQU0sUUFBUSxDQUFDLElBQUksQ0FDakIsSUFBSSw0QkFBYSxDQUFDO1FBQ2hCLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDakMsR0FBRyxFQUFFO1lBQ0gsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFO1NBQ2pCO0tBQ0YsQ0FBQyxDQUNILENBQUM7SUFFRixPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQztLQUNsRCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC4vcmVzb3VyY2VzL2hhbmRsZXJzL3Bvc3RzL2RlbGV0ZS50c1xyXG5cclxuaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xyXG5pbXBvcnQgeyBEZWxldGVDb21tYW5kIH0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcclxuXHJcbmNvbnN0IGR5bmFtb2RiID0gbmV3IER5bmFtb0RCKHt9KTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVQb3N0KHsgaWQgfTogeyBpZDogc3RyaW5nIH0pIHtcclxuICBhd2FpdCBkeW5hbW9kYi5zZW5kKFxyXG4gICAgbmV3IERlbGV0ZUNvbW1hbmQoe1xyXG4gICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRBQkxFX05BTUUsXHJcbiAgICAgIEtleToge1xyXG4gICAgICAgIHBrOiBgUE9TVCMke2lkfWAsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdQb3N0IGRlbGV0ZWQnIH0pLFxyXG4gIH07XHJcbn0iXX0=