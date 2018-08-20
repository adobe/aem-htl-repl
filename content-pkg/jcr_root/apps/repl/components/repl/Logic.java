import java.lang.IllegalStateException;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;

public class Logic extends WCMUsePojo {

    private Page root;

    public void activate() {
        root = getPageManager().getPage("/content/geometrixx/en");
        if (root == null) {
            root = getPageManager().getPage("/content/we-retail/us/en");
        }
        if (root == null) {
            throw new IllegalStateException("No sample content available on this instance.");
        }
    }

    public Page getRootPage() {
        return root;
    }

}
