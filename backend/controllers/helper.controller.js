const cheerio = require("cheerio");

exports.urlWebsiteData = async (req, res, next) => {
  const url = req.body.url;
 
  try {
    
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
   
    const title = $("title").text();
    const description = $("meta[name='description']").prop("content");

    let extractedIconPath =
      $('link[rel="icon"]').prop("href") ??
      $('link[rel="shortcut icon"]').prop("href") ??
      "favicon.ico";

    let icon = extractedIconPath;

    const parsedUrl = new URL(url);

    if (icon.startsWith("http")) {
      icon = extractedIconPath;
    } else if (extractedIconPath.startsWith("//")) {
      icon = `${parsedUrl.protocol}${extractedIconPath}`;
    } else {
      const iconPathname = extractedIconPath.startsWith("/")
        ? extractedIconPath
        : `/${extractedIconPath}`;
      icon = `${parsedUrl.origin}${iconPathname}`;
    }

    const data = {
      icon,
      title,
      description,
    };

    if (data.icon || data.title) {
      return res.status(200).json({
        success: true,
        message: "Url website data",
        data: data,
      });
    } else {
      let error = new Error("Cannot not fetch favicon!.");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
