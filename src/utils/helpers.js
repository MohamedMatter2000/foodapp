import { imageURL } from "../services/aPiConfig";
export function removeDuplicates(array) {
  const seen = new Set();
  return array
    ?.map((item) => ({
      ...item,
      name: item.name.replace(/\s+/g, ""),
    }))
    .filter((item) => {
      if (seen.has(item.name)) {
        return false;
      }
      seen.add(item.name);
      return true;
    });
}
export const pathToFileObject = async (imagePath, setImagePreview) => {
  try {
    const fullImageUrl = `${imageURL}${imagePath}`;
    setImagePreview(fullImageUrl);
    const response = await fetch(fullImageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");
    const blob = await response.blob();
    const fileName = imagePath.split("/").pop();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  } catch (error) {
    return null;
  }
};
export const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Invalid Date";
  }
};
