const cheerio = require("cheerio");

exports.urlWebsiteData = async (req, res) => {
  const url = req.body.url;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $('title').innerText;
  const metaTitle =$("meta[name=title]")
  console.log("url", url,"metaTitle", metaTitle  ,"title", title);

  let extractedIconPath =
    $('link[rel="icon"]').prop("href") ??
    $('link[rel="shortcut icon"]').prop("href") ??
    "favicon.ico";

  let iconPath = extractedIconPath;  

  const parsedUrl = new URL(url);
  
  if (extractedIconPath.startsWith("http")) {
    iconPath = extractedIconPath;
  } else if (extractedIconPath.startsWith("//")) {
    iconPath = `${parsedUrl.protocol}${extractedIconPath}`;
  } else {
    const iconPathname = extractedIconPath.startsWith("/")
      ? extractedIconPath
      : `/${extractedIconPath}`;
    iconPath = `${parsedUrl.origin}${iconPathname}`;
  }

  const data = {
    icon: iconPath,
    title,
  };

  if (data.icon || data.title) {
    return res.status(200).json({
      success: true,
      message: "Url website data",
      data: data,
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Favicon not found!",
    });
  }
};
