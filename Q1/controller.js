import fetchNums from "./helper/fetchNumbers.js";
import { calculateAvg } from "./helper/average.js";
import { getWindowState, updateWindow } from "./helper/window.js";

export async function handleNumberRequest(req, res) {
    const id = req.params.id;
  
    try {
      const result = await fetchNums(id);
      const numbers = result.numbers;
      const prevWindow = getWindowState()
      const updatedWindow = updateWindow(numbers);
      const avg = calculateAvg(updatedWindow);
  
      res.json({
        windowPrevState: prevWindow,
        windowCurrState: updatedWindow,
        numbers: numbers,
        avg: avg
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }