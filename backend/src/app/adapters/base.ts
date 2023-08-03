import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";

const api = wretch()
    .content("application/json")
    .addon(QueryStringAddon)
    .catcher(500, (err) => {
        return {
            ok: false,
            error: {
                status: err.status,
                message: err.json || err.text || err.message,
            },
        };
    })
    .catcherFallback((err) => {
        return {
            ok: false,
            error: {
                status: err.status,
                message: err.json || err.text || err.message,
            },
        };
    });

export default api;
