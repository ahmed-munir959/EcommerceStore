
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query; // Mongoose query (e.g., Product.find())
    this.queryString = queryString; // The query string from the URL (req.query)
  }

  search() {
    const keyword = this.queryString.search
      ? {
        // Search in both name and description
        $or: [
          { name: { $regex: this.queryString.search, $options: 'i' } }, // 'i' for case-insensitive
          { description: { $regex: this.queryString.search, $options: 'i' } },
        ],
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this; // Return the instance to allow chaining
  }

  filter() {
    // 1. Create a shallow copy of the query string
    const queryCopy = { ...this.queryString };

    // 2. Define fields to be removed from the filter
    const removeFields = ['search', 'page', 'limit'];
    removeFields.forEach((key) => delete queryCopy[key]);

    // 3. Advanced Filtering for price (gte, lte, etc.)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    const finalQuery = JSON.parse(queryStr);

    // 4. Handle comma-separated values for multi-select (e.g., category=phones,computers)
    Object.keys(finalQuery).forEach((key) => {
      if (typeof finalQuery[key] === 'string' && finalQuery[key].includes(',')) {
        finalQuery[key] = { $in: finalQuery[key].split(',') };
      }
    });

    this.query = this.query.find(finalQuery);
    return this;
  }

  paginate(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const limit = resultsPerPage || Number(this.queryString.limit) || 10;
    const skip = (currentPage - 1) * limit;

    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}

export default ApiFeatures;