// Flight Search API Service
// In production, integrate with Amadeus, Skyscanner, or Google Flights API

// @desc    Search flights
// @route   GET /api/flights/search
exports.searchFlights = async (req, res, next) => {
  try {
    const { from, to, departDate, returnDate, passengers = 1 } = req.query;

    if (!from || !to || !departDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from, to, and departDate'
      });
    }

    // Simulate flight search results
    const flights = [
      {
        airline: 'Emirates',
        flightNumber: 'EK 205',
        from,
        to,
        departDate,
        returnDate,
        departTime: '08:35',
        arriveTime: '16:45',
        duration: '8h 10m',
        stops: 0,
        price: Math.round(350 + Math.random() * 600),
        cabin: 'Economy'
      },
      {
        airline: 'Qatar Airways',
        flightNumber: 'QR 721',
        from,
        to,
        departDate,
        returnDate,
        departTime: '11:45',
        arriveTime: '20:15',
        duration: '8h 30m',
        stops: 0,
        price: Math.round(300 + Math.random() * 500),
        cabin: 'Economy'
      },
      {
        airline: 'Delta Air Lines',
        flightNumber: 'DL 418',
        from,
        to,
        departDate,
        returnDate,
        departTime: '14:20',
        arriveTime: '23:55',
        duration: '9h 35m',
        stops: 1,
        price: Math.round(250 + Math.random() * 400),
        cabin: 'Economy'
      }
    ];

    res.status(200).json({
      success: true,
      count: flights.length,
      currency: 'USD',
      flights
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get cheap flight deals
// @route   GET /api/flights/deals
exports.getDeals = async (req, res, next) => {
  try {
    const deals = [
      { from: 'New York (JFK)', to: 'London (LHR)', price: 338, airline: 'Various', date: 'November 2026' },
      { from: 'Los Angeles (LAX)', to: 'Tokyo (NRT)', price: 425, airline: 'Various', date: 'February 2027' },
      { from: 'Chicago (ORD)', to: 'Paris (CDG)', price: 389, airline: 'Various', date: 'January 2027' },
      { from: 'Miami (MIA)', to: 'Dubai (DXB)', price: 640, airline: 'Various', date: 'December 2026' }
    ];
    res.status(200).json({ success: true, deals });
  } catch (error) {
    next(error);
  }
};