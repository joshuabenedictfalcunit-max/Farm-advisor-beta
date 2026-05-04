const dataUrl = 'data/demand.json';
const priceApiUrl = 'https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB/2M/FG/0032M4AFP02.px';
const stockApiUrl = 'https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB/2E/CS/0032E4ECNV0.px';
let demandData = [];
let pricePxMetadata = null;
let stockPxMetadata = null;
let priceCommodityCodes = {};
let priceRegionCodes = {};
let stockSectorCodes = {};

const regionSelect = document.getElementById('region-select');
const commoditySelect = document.getElementById('commodity-select');
const demandTableBody = document.getElementById('demand-table-body');
const topCommodityLabel = document.getElementById('top-commodity');
const bestRegionLabel = document.getElementById('best-region');
const demandTrendLabel = document.getElementById('demand-trend');
const recommendationsContainer = document.getElementById('recommendations');
const candlestickContainer = document.getElementById('candlestick-chart');
const chartLabel = document.getElementById('chart-label');

const priceHistoryData = {
  Tomato: [
    { date: 'Apr 20', open: 34, high: 38, low: 33, close: 36 },
    { date: 'Apr 21', open: 36, high: 39, low: 34, close: 38 },
    { date: 'Apr 22', open: 38, high: 40, low: 37, close: 39 },
    { date: 'Apr 23', open: 39, high: 42, low: 38, close: 41 },
    { date: 'Apr 24', open: 41, high: 43, low: 40, close: 42 },
    { date: 'Apr 25', open: 42, high: 44, low: 41, close: 43 },
    { date: 'Apr 26', open: 43, high: 45, low: 42, close: 44 },
  ],
  Rice: [
    { date: 'Apr 20', open: 20, high: 23, low: 19, close: 21 },
    { date: 'Apr 21', open: 21, high: 22, low: 20, close: 22 },
    { date: 'Apr 22', open: 22, high: 23, low: 21, close: 21 },
    { date: 'Apr 23', open: 21, high: 22, low: 20, close: 21 },
    { date: 'Apr 24', open: 21, high: 23, low: 21, close: 23 },
    { date: 'Apr 25', open: 23, high: 24, low: 22, close: 24 },
    { date: 'Apr 26', open: 24, high: 25, low: 23, close: 24 },
  ],
  Pork: [
    { date: 'Apr 20', open: 115, high: 118, low: 112, close: 117 },
    { date: 'Apr 21', open: 117, high: 119, low: 116, close: 118 },
    { date: 'Apr 22', open: 118, high: 120, low: 117, close: 119 },
    { date: 'Apr 23', open: 119, high: 122, low: 118, close: 121 },
    { date: 'Apr 24', open: 121, high: 123, low: 120, close: 123 },
    { date: 'Apr 25', open: 123, high: 124, low: 121, close: 124 },
    { date: 'Apr 26', open: 124, high: 125, low: 123, close: 125 },
  ],
  Eggplant: [
    { date: 'Apr 20', open: 28, high: 30, low: 26, close: 27 },
    { date: 'Apr 21', open: 27, high: 29, low: 25, close: 26 },
    { date: 'Apr 22', open: 26, high: 28, low: 25, close: 27 },
    { date: 'Apr 23', open: 27, high: 29, low: 26, close: 27 },
    { date: 'Apr 24', open: 27, high: 28, low: 26, close: 26 },
    { date: 'Apr 25', open: 26, high: 27, low: 25, close: 25 },
    { date: 'Apr 26', open: 25, high: 26, low: 24, close: 24 },
  ],
  Mango: [
    { date: 'Apr 20', open: 58, high: 61, low: 57, close: 60 },
    { date: 'Apr 21', open: 60, high: 62, low: 59, close: 61 },
    { date: 'Apr 22', open: 61, high: 63, low: 60, close: 62 },
    { date: 'Apr 23', open: 62, high: 64, low: 61, close: 63 },
    { date: 'Apr 24', open: 63, high: 65, low: 62, close: 64 },
    { date: 'Apr 25', open: 64, high: 66, low: 63, close: 65 },
    { date: 'Apr 26', open: 65, high: 67, low: 64, close: 66 },
  ],
  'Carabao Milk': [
    { date: 'Apr 20', open: 42, high: 44, low: 41, close: 43 },
    { date: 'Apr 21', open: 43, high: 45, low: 42, close: 44 },
    { date: 'Apr 22', open: 44, high: 46, low: 43, close: 45 },
    { date: 'Apr 23', open: 45, high: 46, low: 44, close: 45 },
    { date: 'Apr 24', open: 45, high: 47, low: 44, close: 46 },
    { date: 'Apr 25', open: 46, high: 47, low: 45, close: 45 },
    { date: 'Apr 26', open: 45, high: 46, low: 44, close: 45 },
  ],
  Chicken: [
    { date: 'Apr 20', open: 72, high: 75, low: 71, close: 74 },
    { date: 'Apr 21', open: 74, high: 76, low: 73, close: 75 },
    { date: 'Apr 22', open: 75, high: 77, low: 74, close: 76 },
    { date: 'Apr 23', open: 76, high: 78, low: 75, close: 77 },
    { date: 'Apr 24', open: 77, high: 79, low: 76, close: 78 },
    { date: 'Apr 25', open: 78, high: 79, low: 77, close: 78 },
    { date: 'Apr 26', open: 78, high: 80, low: 77, close: 79 },
  ],
  'Sweet Potato': [
    { date: 'Apr 20', open: 19, high: 21, low: 18, close: 20 },
    { date: 'Apr 21', open: 20, high: 21, low: 19, close: 20 },
    { date: 'Apr 22', open: 20, high: 22, low: 19, close: 21 },
    { date: 'Apr 23', open: 21, high: 22, low: 20, close: 21 },
    { date: 'Apr 24', open: 21, high: 23, low: 20, close: 22 },
    { date: 'Apr 25', open: 22, high: 24, low: 21, close: 23 },
    { date: 'Apr 26', open: 23, high: 24, low: 22, close: 23 },
  ],
};

function createOptions(select, values) {
  select.innerHTML = values.map(value => `<option value="${value}">${value}</option>`).join('');
}

function getTrendBadge(trend) {
  if (trend === 'Rising') return '<span class="badge badge-high">Rising</span>';
  if (trend === 'Stable') return '<span class="badge badge-medium">Stable</span>';
  return '<span class="badge badge-low">Falling</span>';
}

function normalizeText(text) {
  return text.toString().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

async function loadPxMetadata() {
  if (pricePxMetadata && stockPxMetadata) return;
  try {
    const [priceResponse, stockResponse] = await Promise.all([
      fetch(priceApiUrl),
      fetch(stockApiUrl)
    ]);

    if (priceResponse.ok) {
      pricePxMetadata = await priceResponse.json();
      const commodityVar = pricePxMetadata.variables.find(v => v.code === 'Commodity');
      const regionVar = pricePxMetadata.variables.find(v => v.code === 'Geolocation');
      if (commodityVar) {
        commodityVar.values.forEach((code, index) => {
          const label = commodityVar.valueTexts[index] || code;
          priceCommodityCodes[normalizeText(label)] = code;
        });
      }
      if (regionVar) {
        regionVar.values.forEach((code, index) => {
          const label = regionVar.valueTexts[index] || code;
          priceRegionCodes[normalizeText(label)] = code;
        });
      }
    }

    if (stockResponse.ok) {
      stockPxMetadata = await stockResponse.json();
      const sectorVar = stockPxMetadata.variables.find(v => v.code === 'Sector');
      if (sectorVar) {
        sectorVar.values.forEach((code, index) => {
          const label = sectorVar.valueTexts[index] || code;
          stockSectorCodes[normalizeText(label)] = code;
        });
      }
    }
  } catch (error) {
    console.warn('Unable to load PSA PXWeb metadata.', error);
  }
}

function findPxCommodityCode(commodity) {
  const normalized = normalizeText(commodity);
  return priceCommodityCodes[normalized] || null;
}

function findPxRegionCode(region) {
  if (!region || region === 'All Regions') return '0';
  const normalized = normalizeText(region);
  if (priceRegionCodes[normalized]) return priceRegionCodes[normalized];
  const matchingKey = Object.keys(priceRegionCodes).find(key => key.includes(normalized) || normalized.includes(key));
  return matchingKey ? priceRegionCodes[matchingKey] : '0';
}

function findStockSectorCode(commodity) {
  const commodityKey = normalizeText(commodity);
  const sectorCandidates = {
    rice: 'Rice: Total Stock',
    corn: 'Corn: Total Stock'
  };
  const label = sectorCandidates[commodityKey];
  if (!label) return null;
  return stockSectorCodes[normalizeText(label)] || null;
}

async function fetchStockHistoryFromPx(commodity) {
  await loadPxMetadata();
  if (!stockPxMetadata) return null;
  const sectorCode = findStockSectorCode(commodity);
  if (!sectorCode) return null;

  const yearVar = stockPxMetadata.variables.find(v => v.code === 'Year');
  const monthVar = stockPxMetadata.variables.find(v => v.code === 'Month');
  if (!yearVar || !monthVar) return null;

  const latestYearCode = yearVar.values[yearVar.values.length - 1];
  const monthValues = monthVar.values;

  try {
    const response = await fetch(stockApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: [
          { code: 'Sector', selection: { filter: 'item', values: [sectorCode] } },
          { code: 'Year', selection: { filter: 'item', values: [latestYearCode] } },
          { code: 'Month', selection: { filter: 'item', values: monthValues } }
        ],
        response: { format: 'json-stat2' }
      })
    });
    if (!response.ok) throw new Error(`PXWeb stock request failed ${response.status}`);

    const dataset = await response.json();
    const values = Array.isArray(dataset.value) ? dataset.value : [];
    const monthLabels = dataset.dimension?.Month?.category?.label ? Object.values(dataset.dimension.Month.category.label) : monthValues.map(value => value.toString());

    return values.map((amount, index) => {
      const close = Number(amount) || 0;
      const open = index > 0 ? Number(values[index - 1] || close) : close;
      const high = Math.max(open, close) * 1.03;
      const low = Math.min(open, close) * 0.97;
      return {
        date: monthLabels[index] || `Period ${index + 1}`,
        open,
        high,
        low,
        close,
        source: 'pxstock'
      };
    }).filter(point => point.close > 0);
  } catch (error) {
    console.warn('Unable to load live PXWeb stock history.', error);
    return null;
  }
}

async function fetchPriceHistoryFromPx(commodity, region) {
  await loadPxMetadata();
  let stockHistory = await fetchStockHistoryFromPx(commodity);
  if (stockHistory && stockHistory.length) return stockHistory;

  if (!pricePxMetadata) return null;

  const commodityCode = findPxCommodityCode(commodity);
  if (!commodityCode) return null;
  const regionCode = findPxRegionCode(region);

  const yearVar = pricePxMetadata.variables.find(v => v.code === 'Year');
  const periodVar = pricePxMetadata.variables.find(v => v.code === 'Period');
  if (!yearVar || !periodVar) return null;

  const latestYearCode = yearVar.values[yearVar.values.length - 1];
  const monthValues = periodVar.values.slice(0, 12);

  try {
    const response = await fetch(priceApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: [
          { code: 'Geolocation', selection: { filter: 'item', values: [regionCode] } },
          { code: 'Commodity', selection: { filter: 'item', values: [commodityCode] } },
          { code: 'Year', selection: { filter: 'item', values: [latestYearCode] } },
          { code: 'Period', selection: { filter: 'item', values: monthValues } }
        ],
        response: { format: 'json-stat2' }
      })
    });
    if (!response.ok) throw new Error(`PXWeb request failed ${response.status}`);
    const dataset = await response.json();
    const values = Array.isArray(dataset.value) ? dataset.value : [];
    const periodLabels = dataset.dimension?.Period?.category?.label ? Object.values(dataset.dimension.Period.category.label) : monthValues.map(value => value.toString());

    return values.map((price, index) => {
      const close = Number(price) || 0;
      const open = index > 0 ? Number(values[index - 1] || close) : close;
      const high = Math.max(open, close) * 1.03;
      const low = Math.min(open, close) * 0.97;
      return {
        date: periodLabels[index] || `Period ${index + 1}`,
        open,
        high,
        low,
        close,
        source: 'pxweb'
      };
    }).filter(point => point.close > 0);
  } catch (error) {
    console.warn('Unable to load live PXWeb price history.', error);
    return null;
  }
}

function renderTable(filteredData) {
  if (filteredData.length === 0) {
    demandTableBody.innerHTML = '<tr><td colspan="4">No data available for the selected filters.</td></tr>';
    return;
  }

  demandTableBody.innerHTML = filteredData.map(item => `
    <tr>
      <td>${item.commodity}</td>
      <td>${item.region}</td>
      <td>${item.score}</td>
      <td>${getTrendBadge(item.trend)}</td>
    </tr>
  `).join('');
}

function getRecommendations(filteredData) {
  if (filteredData.length === 0) return [];
  return filteredData
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderRecommendations(recs) {
  if (recs.length === 0) {
    recommendationsContainer.innerHTML = '<p>No recommendations available yet.</p>';
    return;
  }

  recommendationsContainer.innerHTML = recs.map(item => `
    <article class="card">
      <h3>${item.commodity}</h3>
      <p><strong>Region:</strong> ${item.region}</p>
      <p><strong>Demand score:</strong> ${item.score}</p>
      <p>${item.description}</p>
    </article>
  `).join('');
}

function pickTopCommodity(filteredData) {
  const ordered = filteredData.slice().sort((a, b) => b.score - a.score);
  return ordered[0] || null;
}

function pickBestRegion(filteredData) {
  if (filteredData.length === 0) return null;
  const regionTotals = filteredData.reduce((acc, item) => {
    acc[item.region] = (acc[item.region] || 0) + item.score;
    return acc;
  }, {});

  return Object.entries(regionTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([region]) => region)[0];
}

function renderSummary(filteredData) {
  const top = pickTopCommodity(filteredData);
  const bestRegion = pickBestRegion(filteredData);
  const risingCount = filteredData.filter(item => item.trend === 'Rising').length;

  topCommodityLabel.textContent = top ? `${top.commodity} (${top.score})` : 'No data';
  bestRegionLabel.textContent = bestRegion || 'No data';
  demandTrendLabel.textContent = `${risingCount} rising ${risingCount === 1 ? 'option' : 'options'}`;
}

async function refreshView() {
  const selectedRegion = regionSelect.value;
  const selectedCommodity = commoditySelect.value;

  const filteredData = demandData.filter(item => {
    return (selectedRegion === 'All Regions' || item.region === selectedRegion)
      && (selectedCommodity === 'All Commodities' || item.commodity === selectedCommodity);
  });

  renderTable(filteredData);
  renderSummary(filteredData);
  renderRecommendations(getRecommendations(filteredData));

  const chartCommodity = selectedCommodity === 'All Commodities'
    ? (filteredData.length ? filteredData[0].commodity : 'Tomato')
    : selectedCommodity;
  const chartRegion = selectedRegion;

  let history = await fetchPriceHistoryFromPx(chartCommodity, chartRegion);
  if (!history || history.length === 0) {
    history = priceHistoryData[chartCommodity] || priceHistoryData.Tomato;
  }
  renderCandlestickChart(chartCommodity, history);
}

function renderCandlestickChart(commodity, history) {
  chartLabel.textContent = commodity;

  if (!history || history.length === 0) {
    candlestickContainer.innerHTML = '<p>No price history available for this commodity.</p>';
    return;
  }

  const width = 760;
  const height = 320;
  const padding = { top: 24, right: 20, bottom: 36, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const prices = history.flatMap(item => [item.high, item.low]);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const valueRange = maxPrice - minPrice || 1;
  const xStep = plotWidth / history.length;
  const candleWidth = Math.min(26, xStep * 0.6);

  const yTicks = [maxPrice, minPrice, minPrice + valueRange / 2];
  const gridLines = yTicks.map(price => {
    const y = padding.top + ((maxPrice - price) / valueRange) * plotHeight;
    return `<g>
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />
      <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end">${price.toFixed(0)}</text>
    </g>`;
  }).join('');

  const candles = history.map((item, index) => {
    const x = padding.left + index * xStep + xStep / 2;
    const openY = padding.top + ((maxPrice - item.open) / valueRange) * plotHeight;
    const closeY = padding.top + ((maxPrice - item.close) / valueRange) * plotHeight;
    const highY = padding.top + ((maxPrice - item.high) / valueRange) * plotHeight;
    const lowY = padding.top + ((maxPrice - item.low) / valueRange) * plotHeight;
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
    const bullish = item.close >= item.open;
    const color = bullish ? '#16a34a' : '#c2410c';

    return `<g>
      <line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" stroke="${color}" stroke-width="2" />
      <rect x="${x - candleWidth / 2}" y="${bodyTop}" width="${candleWidth}" height="${bodyHeight}" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="1.5" rx="2" />
      <text x="${x}" y="${height - 8}" text-anchor="middle">${item.date}</text>
    </g>`;
  }).join('');

  candlestickContainer.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Candlestick chart for ${commodity}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="transparent" />
      ${gridLines}
      <g>${candles}</g>
      <text x="${padding.left}" y="${padding.top - 8}" font-size="13" font-weight="700">Price movement (mock PHP/kg)</text>
    </svg>
  `;
}

function initApp() {
  const regions = ['All Regions', ...new Set(demandData.map(item => item.region))];
  const commodities = ['All Commodities', ...new Set(demandData.map(item => item.commodity))];

  createOptions(regionSelect, regions);
  createOptions(commoditySelect, commodities);
  refreshView().catch(console.error);
}

async function loadDemandData() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`Failed to load ${dataUrl}: ${response.status}`);
    demandData = await response.json();
    await loadPxMetadata();
    initApp();
  } catch (error) {
    console.error('Unable to load demand data', error);
    demandTableBody.innerHTML = '<tr><td colspan="4">Unable to load data. Start a local server and make sure data/demand.json exists.</td></tr>';
    topCommodityLabel.textContent = 'No data';
    bestRegionLabel.textContent = 'No data';
    demandTrendLabel.textContent = 'No data';
    recommendationsContainer.innerHTML = '<p>Unable to load recommendations.</p>';
  }
}

regionSelect.addEventListener('change', () => refreshView().catch(console.error));
commoditySelect.addEventListener('change', () => refreshView().catch(console.error));

loadDemandData();
