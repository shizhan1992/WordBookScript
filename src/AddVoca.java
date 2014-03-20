import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;


public class AddVoca implements Runnable {
	
	String RequestVoc = "http://www.shanbay.com/api/v1/wordlist/vocabulary/";
	String listnumber = null;
	String vocabulary = null;
	HttpURLConnection conn = null;
	public AddVoca(String listnumber ,String vocabulary) {
		this.listnumber = listnumber;
		this.vocabulary = vocabulary;
	}

	@Override
	public void run() {
		
		StringBuffer params = new StringBuffer();   
	    
	    params.append("id");   
	    params.append("="); 
	    params.append(listnumber);
	    params.append("&");   
	    params.append("word");   
	    params.append("="); 
	    params.append(vocabulary);   
	        
	    try{   
	        URL url = new URL(RequestVoc);   
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
	    }catch(Exception ex){   
	         ex.printStackTrace();   
	    }finally{   
	         conn.disconnect();   
	    }   

	}

}
