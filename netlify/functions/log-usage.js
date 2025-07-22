// netlify/functions/log-usage.js

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    console.log("Usage log:", {
        timestamp: new Date().toISOString(),
        domain: data.domain,
        feature: data.feature,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Logged successfully" }),
    };
};
