import axios from "axios";

export class UploadService {
  private baseUrl: string;

  constructor(baseUrl: string = "https://xutabe.onrender.com") {
    this.baseUrl = baseUrl;
  }

  /**
   * Uploads a file to the server
   * @param file The file to upload
   * @param metadata Optional metadata to include with the file
   * @returns Promise with the upload response
   */
  async uploadFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${this.baseUrl}/upload`, formData);

      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}

export default UploadService;
