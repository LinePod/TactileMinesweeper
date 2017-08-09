package com.hci.bachelorproject.tactileminesweeper;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.hci.bachelorproject.webapplib.LinepodBaseActivity;

public class MainActivity extends LinepodBaseActivity {

    Button triggerButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        webAppUrl = "file:///android_asset/TactileMinesweeper/src/Android/index.html";
        super.onCreate(savedInstanceState);
        webAppInterface.setOnTriggerSpeechCallback(this);
        triggerButton = (Button) findViewById(R.id.triggerButton);
        triggerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                promptSpeechInput();
            }
        });
    }

}
