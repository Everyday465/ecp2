"use strict";
// ./resources/endpoints/posts.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_all_1 = require("../handlers/posts/get-all");
const create_1 = require("../handlers/posts/create");
const handler = async (event) => {
    try {
        // Handle different HTTP methods
        switch (event.httpMethod) {
            case 'GET':
                return await (0, get_all_1.getAll)();
            case 'POST':
                return await (0, create_1.create)(event.body);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQWlDOzs7QUFHakMsdURBQW1EO0FBQ25ELHFEQUFrRDtBQUUzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBMkIsRUFBRSxFQUFFO0lBQzNELElBQUksQ0FBQztRQUNILGdDQUFnQztRQUNoQyxRQUFRLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QixLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxNQUFNLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1lBQ3hCLEtBQUssTUFBTTtnQkFDVCxPQUFPLE1BQU0sSUFBQSxlQUFNLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDO2dCQUNFLE9BQU87b0JBQ0wsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztpQkFDekQsQ0FBQztRQUNOLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3pDLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBdkJXLFFBQUEsT0FBTyxXQXVCbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuL3Jlc291cmNlcy9lbmRwb2ludHMvcG9zdHMudHNcclxuXHJcbmltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSAnYXdzLWxhbWJkYSc7XHJcbmltcG9ydCB7IGdldEFsbCB9IGZyb20gJy4uL2hhbmRsZXJzL3Bvc3RzL2dldC1hbGwnO1xyXG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9oYW5kbGVycy9wb3N0cy9jcmVhdGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEhhbmRsZSBkaWZmZXJlbnQgSFRUUCBtZXRob2RzXHJcbiAgICBzd2l0Y2ggKGV2ZW50Lmh0dHBNZXRob2QpIHtcclxuICAgICAgY2FzZSAnR0VUJzpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0QWxsKCk7XHJcbiAgICAgIGNhc2UgJ1BPU1QnOlxyXG4gICAgICAgIHJldHVybiBhd2FpdCBjcmVhdGUoZXZlbnQuYm9keSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0ludmFsaWQgSFRUUCBtZXRob2QnIH0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IGVycm9yIH0pLFxyXG4gICAgfTtcclxuICB9XHJcbn07Il19