exports.handler = async function () {
    const domains = process.env.ALLOWED_DOMAINS || "";
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Allow access from your frontend
        },
        body: JSON.stringify(domains.split(",")),
    };
};
