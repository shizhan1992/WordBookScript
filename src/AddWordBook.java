	import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;   
	import java.net.HttpURLConnection;   
	import java.net.URL;   
	import java.util.HashMap;   
	import java.util.Iterator;   
	import java.util.Map;   
import java.util.Map.Entry;   
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

	
public class AddWordBook {
	
	String RequestList = "http://www.shanbay.com/api/v1/wordbook/wordlist/";
	private HttpURLConnection conn = null;   
	public String AddWordList(){
		  StringBuffer params = new StringBuffer();   
		    
		  params.append("name");   
		  params.append("=");   
		  params.append("便携版全词");   
		  params.append("&");   
		  params.append("description");
		  params.append("=");
		  params.append(" "); 
		  params.append("&");
		  params.append("wordbook_id");
		  params.append("=");
		  params.append("79840");
		           
		  try{   
		        URL url = new URL(RequestList);   
		        conn = (HttpURLConnection)url.openConnection();   
		  
		        conn.setDoOutput(true);   
		        conn.setRequestMethod("POST");   
		        conn.setUseCaches(false);   
		        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");   
		        conn.setRequestProperty("Content-Length", String.valueOf(params.length()));
		        conn.setRequestProperty("Cookie", "pgv_pvi=4413656064; csrftoken=SsCUDRvXuTVRc6bvGpeiGVTq1d8CRQBM; sessionid=ltdyeji9hyk7p2w3ig53d9zuc8a8p2c4; username=rushshi; userid=3806068");
		                 
		        conn.setDoInput(true);   
		        conn.connect();   
		                 
		        OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");   
		        out.write(params.toString());   
		        out.flush();   
		        out.close();   
		               
		        int code = conn.getResponseCode();   
		        if (code != 200) {   
		              System.out.println("ERROR===" + code);   
		        } else {   
		              System.out.println("Success!");   
		        }
		        String reponse = conn.getResponseMessage();
		        conn.getContent();
		        
		        InputStream in = conn.getInputStream();
		        BufferedReader br = new BufferedReader(new InputStreamReader(in));
		        String str = "";
		        str=br.readLine();
		        String index = "\"id\": ";
		        String listnumber = str.substring(str.indexOf(index)+index.length(), str.indexOf(index)+index.length()+5);
		        System.err.println(listnumber);
		        return listnumber;
		    }catch(Exception ex){   
		         ex.printStackTrace();   
		    }finally{   
		         conn.disconnect();   
		    }
		return null;   
	}
	
	public boolean AddVocabulary(String urlAddr, HashMap map) throws Exception {   	     
	    boolean isSuccess = false;   
	    
	    return isSuccess;   
	}   
	      
	     public static Cell[] getvocfromexcel(){
	    	 try {
	             Workbook book = Workbook.getWorkbook(new File("C:\\Users\\rushshi\\Desktop\\1.xls"));
	             // 获得第一个工作表对象
	             Sheet sheet = book.getSheet(0);
	             // 得到第一列第一行的单元格
	             Cell[] cell1 = sheet.getColumn(0);
	             book.close();
	             return cell1;           
	         } catch (Exception e) {
	             System.out.println(e);
	         }
			 return null;
	     }
	     
	        public static void main(String args[]){
				AddWordBook test = new AddWordBook();
				ExecutorService tp = Executors.newCachedThreadPool();
				Cell[] cell = getvocfromexcel();
				int j = 2400;
				while(cell.length>j){
					System.out.println(cell.length);
					String listnumber = test.AddWordList();
					System.out.println(listnumber);
					int i = 0;
					for(i = 0; i< 200; i++){
						if(cell[j+i]!=null){
							String voca = cell[j+i].getContents();
							System.out.println(voca);
							tp.execute(new AddVoca(listnumber, voca));
						}
					}
					j+=i;
					try {
						Thread.sleep(10000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				tp.shutdown();
				try {
					tp.awaitTermination(50L, TimeUnit.SECONDS);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
	        }
}   
