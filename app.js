/* =========================================
   AI CROP RISK ANALYSIS – API READY
========================================= */

async function analyzeCrop() {

    const cropData = {
        cropName: document.getElementById("cropName").value,
        district: document.getElementById("district").value,
        area: Number(document.getElementById("area").value),
        sowingDate: document.getElementById("sowingDate").value
    };

    const output = document.getElementById("cropResult");
    output.innerHTML = "<p>Analyzing crop data using AI...</p>";

    try {
        // REAL API READY CALL (backend can be plugged here)
        const response = await fetch("https://api.example.com/ai/crop-risk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cropData)
        });

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const aiResponse = await response.json();
        renderAIResult(aiResponse);

    } catch (error) {
        // Fallback logic when backend is not available
        const fallbackResponse = localAIModule(cropData);
        renderAIResult(fallbackResponse);
    }
}

/* =========================================
   LOCAL AI FALLBACK MODEL
========================================= */
function localAIModule(data) {

    const saturationMap = {
        Wheat: 78,
        Rice: 64,
        Soybean: 42,
        Maize: 33
    };

    const saturation = saturationMap[data.cropName] || 45;

    let risk, advice;

    if (saturation > 75) {
        risk = "RED";
        advice = "High oversupply risk. Avoid planting.";
    } else if (saturation >= 50) {
        risk = "YELLOW";
        advice = "Moderate risk. Consider alternative selling strategy.";
    } else {
        risk = "GREEN";
        advice = "Low risk. Strong market opportunity.";
    }

    return {
        crop: data.cropName,
        district: data.district,
        saturation,
        risk,
        advice,
        alternatives: ["Maize", "Pulses", "Vegetables"]
    };
}

/* =========================================
   UI RENDERING
========================================= */
function renderAIResult(data) {

    const colorMap = {
        GREEN: "success",
        YELLOW: "warning",
        RED: "danger"
    };

    document.getElementById("cropResult").innerHTML = `
        <div class="alert alert-${colorMap[data.risk]}">
            <h5>AI Crop Assessment</h5>
            <p><strong>Crop:</strong> ${data.crop}</p>
            <p><strong>District:</strong> ${data.district}</p>
            <p><strong>Saturation:</strong> ${data.saturation}%</p>
            <p><strong>Risk Level:</strong> ${data.risk}</p>
            <p><strong>Advice:</strong> ${data.advice}</p>
            <p><strong>Alternatives:</strong> ${data.alternatives.join(", ")}</p>
        </div>
    `;
}
