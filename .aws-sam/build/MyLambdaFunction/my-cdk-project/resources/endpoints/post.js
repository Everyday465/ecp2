"use strict";
// ./resources/endpoints/post.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_one_1 = require("../handlers/posts/get-one");
const delete_1 = require("../handlers/posts/delete");
const handler = async (event) => {
    const id = event.pathParameters?.id;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing path parameter: id' }),
        };
    }
    try {
        // Handle different HTTP methods
        switch (event.httpMethod) {
            case 'GET':
                return await (0, get_one_1.getOne)({ id });
            case 'DELETE':
                return await (0, delete_1.deletePost)({ id });
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Invalid HTTP method' }),
                };
        }
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUFnQzs7O0FBR2hDLHVEQUFtRDtBQUNuRCxxREFBc0Q7QUFFL0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQTJCLEVBQUUsRUFBRTtJQUMzRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztJQUVwQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDUixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDO1NBQ2hFLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0gsZ0NBQWdDO1FBQ2hDLFFBQVEsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3pCLEtBQUssS0FBSztnQkFDUixPQUFPLE1BQU0sSUFBQSxnQkFBTSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxNQUFNLElBQUEsbUJBQVUsRUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEM7Z0JBQ0UsT0FBTztvQkFDTCxVQUFVLEVBQUUsR0FBRztvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDO2lCQUN6RCxDQUFDO1FBQ04sQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2Ysc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkIsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDekMsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDLENBQUM7QUFoQ1csUUFBQSxPQUFPLFdBZ0NsQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIC4vcmVzb3VyY2VzL2VuZHBvaW50cy9wb3N0LnRzXHJcblxyXG5pbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xyXG5pbXBvcnQgeyBnZXRPbmUgfSBmcm9tICcuLi9oYW5kbGVycy9wb3N0cy9nZXQtb25lJztcclxuaW1wb3J0IHsgZGVsZXRlUG9zdCB9IGZyb20gJy4uL2hhbmRsZXJzL3Bvc3RzL2RlbGV0ZSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpID0+IHtcclxuICBjb25zdCBpZCA9IGV2ZW50LnBhdGhQYXJhbWV0ZXJzPy5pZDtcclxuXHJcbiAgaWYgKCFpZCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdNaXNzaW5nIHBhdGggcGFyYW1ldGVyOiBpZCcgfSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIEhhbmRsZSBkaWZmZXJlbnQgSFRUUCBtZXRob2RzXHJcbiAgICBzd2l0Y2ggKGV2ZW50Lmh0dHBNZXRob2QpIHtcclxuICAgICAgY2FzZSAnR0VUJzpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0T25lKHsgaWQgfSk7XHJcbiAgICAgIGNhc2UgJ0RFTEVURSc6XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGRlbGV0ZVBvc3QoeyBpZCB9KTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnSW52YWxpZCBIVFRQIG1ldGhvZCcgfSksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogZXJyb3IgfSksXHJcbiAgICB9O1xyXG4gIH1cclxufTsiXX0=