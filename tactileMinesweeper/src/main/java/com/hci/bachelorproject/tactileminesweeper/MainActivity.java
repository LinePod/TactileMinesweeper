package com.hci.bachelorproject.tactileminesweeper;

import android.os.Bundle;
import android.view.View;

import com.hci.bachelorproject.webapplib.LinepodBaseActivity;

public class MainActivity extends LinepodBaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        webAppUrl = "file:///android_asset/TactileMinesweeper/src/Android/index.html";
        super.onCreate(savedInstanceState);
        webAppInterface.setOnTriggerSpeechCallback(this);
        webView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                promptSpeechInput();
            }
        });
    }

}
